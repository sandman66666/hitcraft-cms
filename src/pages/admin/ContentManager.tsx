import React, { useState, useEffect, useCallback } from 'react';
import { ContentLoader } from '../../utils/content-loader';
import { LandingPageContent } from '../../types/content';
import { createBackup } from '../../api/createBackup';
import './ContentManager.css';
import { ContentService } from '../../services/ContentService';

type ContentSection = keyof LandingPageContent;

export default function ContentManager() {
  const [content, setContent] = useState<LandingPageContent | null>(null);
  const [activeSection, setActiveSection] = useState<ContentSection>('hero');
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isEditing, setIsEditing] = useState(false);

  const contentLoader = ContentLoader.getInstance();
  const contentService = ContentService.getInstance();

  const loadContent = useCallback(async () => {
    const landingContent = await contentLoader.refreshContent();
    setContent(landingContent);
  }, [contentLoader]);

  useEffect(() => {
    loadContent();
  }, [loadContent]);

  const handleContentChange = useCallback(async (sectionKey: ContentSection, newContent: Partial<LandingPageContent[ContentSection]>) => {
    if (!content) return;

    setIsSaving(true);
    setSaveStatus('idle');

    try {
      await contentLoader.updateAndSaveContent(sectionKey, newContent);
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 3000);
      
      // Refresh content after saving
      await loadContent();
    } catch (error) {
      console.error('Error saving content:', error);
      setSaveStatus('error');
    } finally {
      setIsSaving(false);
    }
  }, [content, contentLoader, loadContent]);

  const handleEnterEditMode = async () => {
    if (!content) return;
    try {
      await contentService.createBackup(content);
      setIsEditing(true);
    } catch (error) {
      console.error('Error creating backup:', error);
      // Show error message to user
      alert('Failed to create backup. Please try again.');
    }
  };

  const handleSave = async () => {
    if (!content) return;
    
    setIsSaving(true);
    setSaveStatus('idle');
    
    try {
      await contentService.updateContent(content);
      setSaveStatus('success');
      setIsEditing(false);
      setTimeout(() => setSaveStatus('idle'), 3000);
      // Refresh content after saving
      await loadContent();
    } catch (error) {
      console.error('Error saving content:', error);
      setSaveStatus('error');
      alert('Failed to save changes. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  if (!content) {
    return <div className="admin-loading">Loading...</div>;
  }

  const sections: Array<{ key: ContentSection; label: string }> = [
    { key: 'hero', label: 'Hero Section' },
    { key: 'mainValue', label: 'Main Value' },
    { key: 'coreBenefits', label: 'Core Benefits' },
    { key: 'produceSong', label: 'Produce Song' },
    { key: 'writingPartner', label: 'Writing Partner' },
    { key: 'uniqueApproach', label: 'Unique Approach' },
    { key: 'socialProof', label: 'Social Proof' },
    { key: 'callToAction', label: 'Call To Action' }
  ];

  const renderSectionEditor = (section: ContentSection): React.ReactNode => {
    switch (section) {
      case 'hero':
        return (
          <div className="editor-group">
            <h3>Hero Section</h3>
            <div className="field-group">
              <label>Title</label>
              <input
                type="text"
                value={content.hero.title}
                onChange={(e) => handleContentChange('hero', { title: e.target.value })}
                className="title-input"
              />
            </div>
            <div className="field-group">
              <label>Subtitle</label>
              <input
                type="text"
                value={content.hero.subtitle}
                onChange={(e) => handleContentChange('hero', { subtitle: e.target.value })}
                className="subtitle-input"
              />
            </div>
            <div className="field-group">
              <label>Description</label>
              <textarea
                value={content.hero.description}
                onChange={(e) => handleContentChange('hero', { description: e.target.value })}
                className="description-input"
              />
            </div>
            <div className="field-group">
              <label>Button Text</label>
              <input
                type="text"
                value={content.hero.button.text}
                onChange={(e) => handleContentChange('hero', { button: { ...content.hero.button, text: e.target.value } })}
                className="button-text-input"
              />
            </div>
            {content.hero.secondaryButton && (
              <div className="field-group">
                <label>Secondary Button Text</label>
                <input
                  type="text"
                  value={content.hero.secondaryButton.text}
                  onChange={(e) => handleContentChange('hero', { secondaryButton: { ...content.hero.secondaryButton, text: e.target.value } })}
                  className="secondary-button-text-input"
                />
              </div>
            )}
          </div>
        );
      case 'mainValue':
        return (
          <div className="editor-group">
            <h3>Main Value Section</h3>
            <div className="field-group">
              <label>Title</label>
              <input
                type="text"
                value={content.mainValue.title}
                onChange={(e) => handleContentChange('mainValue', { title: e.target.value })}
                className="title-input"
              />
            </div>
            <div className="field-group">
              <label>Subtitle</label>
              <input
                type="text"
                value={content.mainValue.subtitle}
                onChange={(e) => handleContentChange('mainValue', { subtitle: e.target.value })}
                className="subtitle-input"
              />
            </div>
            <div className="field-group">
              <label>Description</label>
              <textarea
                value={content.mainValue.description}
                onChange={(e) => handleContentChange('mainValue', { description: e.target.value })}
                className="description-input"
              />
            </div>
            <div className="field-group">
              <label>Features</label>
              {content.mainValue.features.map((feature, index) => (
                <input
                  key={index}
                  type="text"
                  value={feature}
                  onChange={(e) => {
                    const newFeatures = [...content.mainValue.features];
                    newFeatures[index] = e.target.value;
                    handleContentChange('mainValue', { features: newFeatures });
                  }}
                  className="feature-input"
                />
              ))}
            </div>
          </div>
        );
      case 'coreBenefits':
        return (
          <div className="editor-group">
            <h3>Core Benefits</h3>
            <div className="field-group">
              <label>Title</label>
              <input
                type="text"
                value={content.coreBenefits.title}
                onChange={(e) => handleContentChange('coreBenefits', { title: e.target.value })}
                className="title-input"
              />
            </div>
            {content.coreBenefits.benefits.map((benefit, index) => (
              <div key={index} className="benefit-group">
                <h4>Benefit {index + 1}</h4>
                <div className="field-group">
                  <label>Title</label>
                  <input
                    type="text"
                    value={benefit.title}
                    onChange={(e) => {
                      const newBenefits = [...content.coreBenefits.benefits];
                      newBenefits[index] = { ...benefit, title: e.target.value };
                      handleContentChange('coreBenefits', { benefits: newBenefits });
                    }}
                    className="benefit-title-input"
                  />
                </div>
                <div className="field-group">
                  <label>Description</label>
                  <textarea
                    value={benefit.description}
                    onChange={(e) => {
                      const newBenefits = [...content.coreBenefits.benefits];
                      newBenefits[index] = { ...benefit, description: e.target.value };
                      handleContentChange('coreBenefits', { benefits: newBenefits });
                    }}
                    className="benefit-description-input"
                  />
                </div>
                <div className="field-group">
                  <label>Icon</label>
                  <input
                    type="text"
                    value={benefit.icon}
                    onChange={(e) => {
                      const newBenefits = [...content.coreBenefits.benefits];
                      newBenefits[index] = { ...benefit, icon: e.target.value };
                      handleContentChange('coreBenefits', { benefits: newBenefits });
                    }}
                    className="benefit-icon-input"
                  />
                </div>
              </div>
            ))}
          </div>
        );
      case 'produceSong':
        return (
          <div className="editor-group">
            <h3>Produce Song Section</h3>
            <div className="field-group">
              <label>Title</label>
              <input
                type="text"
                value={content.produceSong.title}
                onChange={(e) => handleContentChange('produceSong', { title: e.target.value })}
                className="title-input"
              />
            </div>
            <div className="field-group">
              <label>Subtitle</label>
              <input
                type="text"
                value={content.produceSong.subtitle}
                onChange={(e) => handleContentChange('produceSong', { subtitle: e.target.value })}
                className="subtitle-input"
              />
            </div>
            <div className="field-group">
              <label>Description</label>
              <textarea
                value={content.produceSong.description}
                onChange={(e) => handleContentChange('produceSong', { description: e.target.value })}
                className="description-input"
              />
            </div>
            {content.produceSong.features && (
              <div className="field-group">
                <label>Features</label>
                {content.produceSong.features.map((feature, index) => (
                  <input
                    key={index}
                    type="text"
                    value={feature}
                    onChange={(e) => {
                      const newFeatures = [...content.produceSong.features!];
                      newFeatures[index] = e.target.value;
                      handleContentChange('produceSong', { features: newFeatures });
                    }}
                    className="feature-input"
                  />
                ))}
              </div>
            )}
            {content.produceSong.button && (
              <div className="field-group">
                <label>Button Text</label>
                <input
                  type="text"
                  value={content.produceSong.button.text}
                  onChange={(e) => handleContentChange('produceSong', { button: { ...content.produceSong.button!, text: e.target.value } })}
                  className="button-text-input"
                />
              </div>
            )}
          </div>
        );
      case 'writingPartner':
        return (
          <div className="editor-group">
            <h3>Writing Partner Section</h3>
            <div className="field-group">
              <label>Title</label>
              <input
                type="text"
                value={content.writingPartner.title}
                onChange={(e) => handleContentChange('writingPartner', { title: e.target.value })}
                className="title-input"
              />
            </div>
            <div className="field-group">
              <label>Subtitle</label>
              <input
                type="text"
                value={content.writingPartner.subtitle}
                onChange={(e) => handleContentChange('writingPartner', { subtitle: e.target.value })}
                className="subtitle-input"
              />
            </div>
            <div className="field-group">
              <label>Description</label>
              <textarea
                value={content.writingPartner.description}
                onChange={(e) => handleContentChange('writingPartner', { description: e.target.value })}
                className="description-input"
              />
            </div>
            {content.writingPartner.features && (
              <div className="field-group">
                <label>Features</label>
                {content.writingPartner.features.map((feature, index) => (
                  <input
                    key={index}
                    type="text"
                    value={feature}
                    onChange={(e) => {
                      const newFeatures = [...content.writingPartner.features!];
                      newFeatures[index] = e.target.value;
                      handleContentChange('writingPartner', { features: newFeatures });
                    }}
                    className="feature-input"
                  />
                ))}
              </div>
            )}
            {content.writingPartner.button && (
              <div className="field-group">
                <label>Button Text</label>
                <input
                  type="text"
                  value={content.writingPartner.button.text}
                  onChange={(e) => handleContentChange('writingPartner', { button: { ...content.writingPartner.button!, text: e.target.value } })}
                  className="button-text-input"
                />
              </div>
            )}
          </div>
        );
      case 'uniqueApproach':
        return (
          <div className="editor-group">
            <h3>Unique Approach Section</h3>
            <div className="field-group">
              <label>Title</label>
              <input
                type="text"
                value={content.uniqueApproach.title}
                onChange={(e) => handleContentChange('uniqueApproach', { title: e.target.value })}
                className="title-input"
              />
            </div>
            {content.uniqueApproach.features.map((feature, index) => (
              <div key={index} className="feature-group">
                <h4>Feature {index + 1}</h4>
                <div className="field-group">
                  <label>Title</label>
                  <input
                    type="text"
                    value={feature.title}
                    onChange={(e) => {
                      const newFeatures = [...content.uniqueApproach.features];
                      newFeatures[index] = { ...feature, title: e.target.value };
                      handleContentChange('uniqueApproach', { features: newFeatures });
                    }}
                    className="feature-title-input"
                  />
                </div>
                <div className="field-group">
                  <label>Description</label>
                  <textarea
                    value={feature.description}
                    onChange={(e) => {
                      const newFeatures = [...content.uniqueApproach.features];
                      newFeatures[index] = { ...feature, description: e.target.value };
                      handleContentChange('uniqueApproach', { features: newFeatures });
                    }}
                    className="feature-description-input"
                  />
                </div>
                <div className="field-group">
                  <label>Icon</label>
                  <input
                    type="text"
                    value={feature.icon}
                    onChange={(e) => {
                      const newFeatures = [...content.uniqueApproach.features];
                      newFeatures[index] = { ...feature, icon: e.target.value };
                      handleContentChange('uniqueApproach', { features: newFeatures });
                    }}
                    className="feature-icon-input"
                  />
                </div>
              </div>
            ))}
          </div>
        );
      case 'socialProof':
        return (
          <div className="editor-group">
            <h3>Social Proof Section</h3>
            <div className="field-group">
              <label>Title</label>
              <input
                type="text"
                value={content.socialProof.title}
                onChange={(e) => handleContentChange('socialProof', { title: e.target.value })}
                className="title-input"
              />
            </div>
            <div className="field-group">
              <label>Subtitle</label>
              <input
                type="text"
                value={content.socialProof.subtitle}
                onChange={(e) => handleContentChange('socialProof', { subtitle: e.target.value })}
                className="subtitle-input"
              />
            </div>
            {content.socialProof.testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-group">
                <h4>Testimonial {index + 1}</h4>
                <div className="field-group">
                  <label>Quote</label>
                  <textarea
                    value={testimonial.quote}
                    onChange={(e) => {
                      const newTestimonials = [...content.socialProof.testimonials];
                      newTestimonials[index] = { ...testimonial, quote: e.target.value };
                      handleContentChange('socialProof', { testimonials: newTestimonials });
                    }}
                    className="testimonial-quote-input"
                  />
                </div>
                <div className="field-group">
                  <label>Author</label>
                  <input
                    type="text"
                    value={testimonial.author}
                    onChange={(e) => {
                      const newTestimonials = [...content.socialProof.testimonials];
                      newTestimonials[index] = { ...testimonial, author: e.target.value };
                      handleContentChange('socialProof', { testimonials: newTestimonials });
                    }}
                    className="testimonial-author-input"
                  />
                </div>
                <div className="field-group">
                  <label>Role</label>
                  <input
                    type="text"
                    value={testimonial.role}
                    onChange={(e) => {
                      const newTestimonials = [...content.socialProof.testimonials];
                      newTestimonials[index] = { ...testimonial, role: e.target.value };
                      handleContentChange('socialProof', { testimonials: newTestimonials });
                    }}
                    className="testimonial-role-input"
                  />
                </div>
                <div className="field-group">
                  <label>Image</label>
                  <input
                    type="text"
                    value={testimonial.image}
                    onChange={(e) => {
                      const newTestimonials = [...content.socialProof.testimonials];
                      newTestimonials[index] = { ...testimonial, image: e.target.value };
                      handleContentChange('socialProof', { testimonials: newTestimonials });
                    }}
                    className="testimonial-image-input"
                  />
                </div>
              </div>
            ))}
          </div>
        );
      case 'callToAction':
        return (
          <div className="editor-group">
            <h3>Call To Action Section</h3>
            <div className="field-group">
              <label>Title</label>
              <input
                type="text"
                value={content.callToAction.title}
                onChange={(e) => handleContentChange('callToAction', { title: e.target.value })}
                className="title-input"
              />
            </div>
            <div className="field-group">
              <label>Subtitle</label>
              <input
                type="text"
                value={content.callToAction.subtitle}
                onChange={(e) => handleContentChange('callToAction', { subtitle: e.target.value })}
                className="subtitle-input"
              />
            </div>
            <div className="field-group">
              <label>Button Text</label>
              <input
                type="text"
                value={content.callToAction.button.text}
                onChange={(e) => handleContentChange('callToAction', { button: { ...content.callToAction.button, text: e.target.value } })}
                className="button-text-input"
              />
            </div>
            <div className="field-group">
              <label>Features</label>
              {content.callToAction.features.map((feature, index) => (
                <input
                  key={index}
                  type="text"
                  value={feature}
                  onChange={(e) => {
                    const newFeatures = [...content.callToAction.features];
                    newFeatures[index] = e.target.value;
                    handleContentChange('callToAction', { features: newFeatures });
                  }}
                  className="feature-input"
                />
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Content Manager</h1>
        <div className="admin-actions">
          {!isEditing ? (
            <button onClick={handleEnterEditMode} className="edit-button">
              Edit Content
            </button>
          ) : (
            <button 
              onClick={handleSave}
              disabled={isSaving}
              className={`save-button ${saveStatus}`}
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          )}
          {saveStatus === 'success' && <span className="success-message">Changes saved successfully!</span>}
          {saveStatus === 'error' && <span className="error-message">Error saving changes</span>}
        </div>
      </div>

      <div className="admin-sections">
        <div className="section-selector">
          <h2>Sections</h2>
          <select 
            value={activeSection}
            onChange={(e) => setActiveSection(e.target.value as ContentSection)}
            disabled={!isEditing}
          >
            {sections.map(({ key, label }) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        </div>

        <div className="section-editor">
          {isEditing ? renderSectionEditor(activeSection) : (
            <div className="view-mode">
              <p>Click "Edit Content" to make changes.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}