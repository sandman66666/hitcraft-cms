import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "@/styles/components/contact-us.css";
import { useAuth } from "@/contexts/AuthContext";

interface FormState {
  fullName: string;
  email: string;
  message: string;
}

interface FormStatus {
  success: boolean;
  message: string;
}

const ContactUs: React.FC = () => {
  const navigate = useNavigate();
  const {
    descope: { user },
  } = useAuth();
  const [formData, setFormData] = useState<FormState>({
    fullName: user?.name || "",
    email: user?.email || "",
    message: "",
  });
  const [status, setStatus] = useState<FormStatus>({
    success: false,
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      fullName: user?.name || "",
      email: user?.email || "",
    }));
  }, [user]);

  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    // Validate email format
    if (!validateEmail(formData.email)) {
      setStatus({
        success: false,
        message: "Please enter a valid email address.",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      setStatus({ success: false, message: "" }); // Clear previous messages

      const response = await fetch("https://api.dstro.ai/users/contact-us", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          message: formData.message,
        }),
      });

      const data = await response.json().catch(() => null);

      if (response.ok) {
        setStatus({
          success: true,
          message:
            data?.message ||
            "Thank you for your message! We'll get back to you soon.",
        });
        // Reset form
        setFormData({
          fullName: "",
          email: "",
          message: "",
        });
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } else {
        let errorMessage = "Failed to send message. Please try again.";

        if (response.status === 400) {
          errorMessage =
            data?.message || "Please check your input and try again.";
        } else if (response.status === 429) {
          errorMessage = "Too many attempts. Please try again later.";
        } else if (response.status === 500) {
          errorMessage = "Server error. Please try again later.";
        }

        setStatus({
          success: false,
          message: errorMessage,
        });
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setStatus({
        success: false,
        message: "Network error. Please check your connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="w-full flex justify-center" role="main">
      <div className="white-container sm:w-[896px] sm:max-w-none w-[90%] max-w-[896px] rounded-[30.3px] md:rounded-[42px]">
        <div className="white-container-wrapper" itemScope itemType="https://schema.org/ContactPage">
          <header className="text-center relative">
            <h1 className="font-prop-normal text-[38px] font-light mb-4">
              We hear <strong className="font-bold">you</strong>.
            </h1>
            <p className="font-prop-normal text-center text-[16px] leading-[1.5] text-[#252931] opacity-80">
              Anything you want to tell us? We'd love to hear it.
            </p>
          </header>

          {status.message && (
            <div
              className={`text-center p-4 rounded-lg mt-4 ${
                status.success
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {status.message}
            </div>
          )}

          <section className="flex-grow w-full ps-[18px] m-[10px] mt-0 sm:mt-0 custom-login-container" aria-label="Contact Form">
            <form 
              onSubmit={handleSubmit} 
              className="space-y-6" 
              itemScope 
              itemType="https://schema.org/ContactForm"
              aria-label="Contact form"
            >
              <div className="input-container">
                <label htmlFor="fullName" className="sr-only">Full Name</label>
                <input
                  id="fullName"
                  type="text"
                  placeholder="Full Name"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="input-style"
                  required
                  disabled={isSubmitting}
                  aria-required="true"
                  aria-invalid={!formData.fullName}
                  aria-describedby={!formData.fullName ? "fullName-error" : undefined}
                />
                {!formData.fullName && (
                  <span id="fullName-error" className="sr-only">Please enter your full name</span>
                )}
              </div>

              <div className="input-container">
                <label htmlFor="email" className="sr-only">Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="input-style"
                  required
                  disabled={isSubmitting}
                  aria-required="true"
                  aria-invalid={!validateEmail(formData.email)}
                  aria-describedby={!validateEmail(formData.email) ? "email-error" : undefined}
                />
                {!validateEmail(formData.email) && formData.email && (
                  <span id="email-error" className="text-red-500 text-sm mt-1">Please enter a valid email address</span>
                )}
              </div>

              <div className="input-container">
                <label htmlFor="message" className="sr-only">Message</label>
                <textarea
                  id="message"
                  placeholder="Message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="input-style !min-h-[200px] resize-none"
                  required
                  disabled={isSubmitting}
                  aria-required="true"
                  aria-invalid={!formData.message}
                  aria-describedby={!formData.message ? "message-error" : undefined}
                />
              </div>

              <div className="flex justify-center space-x-2">
                <button
                  type="submit"
                  className="mt-6 black-button text-white px-4 py-2 rounded-lg !w-[312px] main-button-design gradient-purple-button mx-auto"
                  disabled={isSubmitting}
                  aria-busy={isSubmitting}
                  aria-label={isSubmitting ? "Sending message..." : "Send message"}
                >
                  {isSubmitting ? "SENDING..." : "SEND MESSAGE"}
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </main>
  );
};

export default ContactUs;
