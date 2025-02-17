import React from 'react';
import CTAButton from '../../shared/CTAButton';
import EditableText from '../../shared/EditableText';
import { useEdit } from '../../../contexts/EditContext';
import { ContentLoader } from '@/utils/content-loader';
import { MainValueContent } from '../../../types/landing';

const MainValueSection: React.FC = () => {
  const { isEditMode, content, setContent } = useEdit();
  const [localContent, setLocalContent] = React.useState<MainValueContent | null>(null);

  React.useEffect(() => {
    ContentLoader.getInstance().getContent()
      .then(content => {
        if (content?.mainValue) {
          setLocalContent(content.mainValue);
        }
      })
      .catch(error => console.error('Error loading main value content:', error));
  }, []);


  if (!localContent) {
    return null; // or loading state
  }

  const updateContent = (path: string, value: string | string[]) => {
    if (!content) return;
    const newContent = { ...content };
    const pathArray = path.split('.');
    let current: any = newContent;
    
    for (let i = 0; i < pathArray.length - 1; i++) {
      current = current[pathArray[i]];
    }
    current[pathArray[pathArray.length - 1]] = value;
    setContent(newContent);
  };

  return (
    <section className="w-full min-h-screen flex items-center relative bg-gradient-to-br from-gray-900 to-black py-24">
      <div className="absolute inset-0 bg-[url('/assets/images/bg/2xl_bg.png')] bg-cover bg-center opacity-10" />
      <div className="absolute inset-0 pointer-events-none z-[1] overflow-hidden select-none">
        <div className="shooting-star">
          <div className="star"></div>
          <div className="star-trail"></div>
        </div>
      </div>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-24 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-10">
        <div className="text-center lg:text-left">
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-light mb-8">
            <EditableText
              content={localContent.title || 'Start Songs'}
              onChange={(value: string) => updateContent('mainValue.title', value)}
              className="bg-clip-text text-transparent bg-gradient-to-r from-[#8a44c8] to-[#df0c39]"
            />
            <EditableText
              content={localContent.subtitle || 'With Confidence'}
              onChange={(value: string) => updateContent('mainValue.subtitle', value)}
              className="font-bold block mt-4 bg-clip-text text-transparent bg-gradient-to-r from-[#8a44c8] to-[#df0c39]"
            />
          </h2>
          <EditableText
            content={localContent.description || "Eliminate uncertainty at the beginning of the songwriting process. Get inspired by AI-generated themes, chord progressions, and melody ideas to kickstart your creation."}
            onChange={(value: string) => updateContent('mainValue.description', value)}
            className="text-xl lg:text-2xl mb-12 text-gray-300 max-w-xl"
          />

          <div className="bg-white/[0.12] backdrop-blur-sm rounded-2xl p-8 mb-12 max-w-2xl mx-auto shadow-[0_4px_12px_rgba(0,0,0,0.1),inset_0px_2px_10px_rgba(0,0,0,0.1)] border border-white/10">
            <EditableText
              content={localContent.subtitle || 'Your Complete Music Creation Partner'}
              onChange={(value) => updateContent('mainValue.subtitle', value)}
              className="text-2xl sm:text-3xl font-medium mb-8 text-white [text-shadow:0px_2px_4px_rgba(0,0,0,0.1)]"
              as="h3"
            />
            <ul className="text-left text-lg sm:text-xl text-gray-100 space-y-6 leading-[1.4]">
              {(localContent.questions || [
                "Please help me create a new instrument track for my project",
                "What chord progression would work here?",
                "Help me write lyrics about...",
                "Can you produce this in a pop style?"
              ]).map((question, index) => (
                <li key={index} className="flex items-center">
                  <span className="text-white mr-3">•</span>
                  <EditableText
                    content={`"${question}"`}
                    onChange={(value) => {
                      const newQuestions = [...(localContent.questions || [])];
                      newQuestions[index] = value.replace(/^"|"$/g, '');
                      updateContent('mainValue.questions', newQuestions);
                    }}
                    className="inline"
                  />
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-12 pt-[62px] border-t border-white/20">
            <div className="flex items-center justify-center">
              <CTAButton 
                className="bg-gradient-to-r from-[#8a44c8] to-[#df0c39] text-white px-8 py-4 rounded-full text-xl font-black transition-all duration-300 hover:scale-105 hover:shadow-[0px_4px_12px_rgba(138,68,200,0.3)] hover:-translate-y-0.5 flex items-center justify-center w-full sm:w-auto min-w-[200px]"
                text={localContent.button?.text || "START CREATING NOW"}
                variant="dark"
              />
              <p className="text-sm text-gray-400 mt-4 font-light">No credit card required • Try it free</p>
            </div>
          </div>
        </div>
        <div className="flex justify-start lg:justify-center">
          <div className="relative w-[65%] max-w-xl">
            <div className="absolute inset-0 bg-gradient-to-r from-[#8a44c8] to-[#df0c39] rounded-2xl blur-xl opacity-20 transform -rotate-6"></div>
            <video
              className="relative w-full rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
              autoPlay
              muted
              loop
              playsInline
              src="/assets/Start-Songs.mp4"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MainValueSection;