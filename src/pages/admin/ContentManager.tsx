import { useState, useEffect } from 'react';
import { ContentLoader } from '../../utils/content-loader';
import { LandingPageContent } from '../../types/content';
import './ContentManager.css';

export default function ContentManager() {
  const [content, setContent] = useState<LandingPageContent | null>(null);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    const loadContent = async () => {
      const contentLoader = ContentLoader.getInstance();
      const landingContent = await contentLoader.getContent();
      setContent(landingContent);
    };
    loadContent();
  }, []);

  const handleContentChange = (sectionKey: string, newContent: any) => {
    if (!content) return;
    
    setContent({
      ...content,
      [sectionKey]: {
        ...content[sectionKey],
        ...newContent
      }
    });
  };

  const handleSave = async () => {
    if (!content) return;
    
    setIsSaving(true);
    setSaveStatus('idle');
    
    try {
      const contentLoader = ContentLoader.getInstance();
      await contentLoader.updateContent(content);
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch (error) {
      console.error('Error saving content:', error);
      setSaveStatus('error');
    } finally {
      setIsSaving(false);
    }
  };

  if (!content) {
    return <div className="admin-loading">Loading...</div>;
  }

  const sections = [
    { key: 'hero', label: 'Hero Section' },
    { key: 'mainValue', label: 'Main Value' },
    { key: 'coreBenefits', label: 'Core Benefits' },
    { key: 'writingPartner', label: 'Writing Partner' },
    { key: 'produceSong', label: 'Produce Song' },
    { key: 'writersBlock', label: "Writer's Block" },
    { key: 'musicMentor', label: 'Music Mentor' },
    { key: 'perfectProcess', label: 'Perfect Process' },
    { key: 'testimonials', label: 'Testimonials' },
    { key: 'demo', label: 'Demo' },
    { key: 'uniqueApproach', label: 'Unique Approach' }
  ];

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Content Manager</h1>
        <div className="admin-actions">
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className={`save-button ${saveStatus}`}
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
          {saveStatus === 'success' && <span className="success-message">Changes saved successfully!</span>}
          {saveStatus === 'error' && <span className="error-message">Error saving changes</span>}
        </div>
      </div>

      <div className="admin-sections">
        <div className="section-selector">
          <h2>Sections</h2>
          <select 
            value={activeSection}
            onChange={(e) => setActiveSection(e.target.value)}
          >
            {sections.map(({ key, label }) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        </div>

        <div className="section-editor">
          {activeSection === 'hero' && (
            <div className="editor-group">
              <h3>Hero Section</h3>
              <div className="field-group">
                <label>Heading</label>
                <input
                  type="text"
                  value={content.hero.heading}
                  onChange={(e) => handleContentChange('hero', { heading: e.target.value })}
                  className="heading-input"
                />
              </div>
              <div className="field-group">
                <label>Subheading</label>
                <input
                  type="text"
                  value={content.hero.subheading}
                  onChange={(e) => handleContentChange('hero', { subheading: e.target.value })}
                  className="subheading-input"
                />
              </div>
            </div>
          )}
          {/* Add other section editors similarly */}
        </div>
      </div>
    </div>
  );
}
