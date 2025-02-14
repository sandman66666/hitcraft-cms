import React, { useState, useEffect } from 'react';
import { LandingPageContent } from '../types/content';

export default function AdminPage() {
  const [content, setContent] = useState<LandingPageContent | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>('hero');

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const response = await fetch('/src/data/landing-page.json');
      const data = await response.json();
      setContent(data);
    } catch (err) {
      setError('Failed to load content');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content) return;

    setSaving(true);
    setError(null);

    try {
      // Create backup
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const backupPath = `/src/data/backups/landing-page-${timestamp}.json`;
      
      await fetch('/api/save-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, path: backupPath })
      });

      // Save new content
      await fetch('/api/save-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, path: '/src/data/landing-page.json' })
      });

      alert('Content saved successfully!');
    } catch (err) {
      setError('Failed to save content');
    } finally {
      setSaving(false);
    }
  };

  const updateContent = (path: string, value: any) => {
    if (!content) return;

    const pathArray = path.split('.');
    const newContent = { ...content };
    let current: any = newContent;

    for (let i = 0; i < pathArray.length - 1; i++) {
      current = current[pathArray[i]];
    }
    current[pathArray[pathArray.length - 1]] = value;
    setContent(newContent);
  };

  if (!content) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const sections = [
    { id: 'hero', label: 'Hero Section' },
    { id: 'mainValue', label: 'Main Value' },
    { id: 'coreBenefits', label: 'Core Benefits' },
    { id: 'uniqueApproach', label: 'Unique Approach' },
    { id: 'socialProof', label: 'Social Proof' },
    { id: 'callToAction', label: 'Call to Action' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-2xl font-semibold">Edit Landing Page Content</h1>
              <button
                onClick={handleSave}
                disabled={saving}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save All Changes'}
              </button>
            </div>

            {error && (
              <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6">
                {error}
              </div>
            )}

            <div className="flex gap-8">
              {/* Section Navigation */}
              <div className="w-64 flex-shrink-0">
                <div className="sticky top-8">
                  <h2 className="text-lg font-medium mb-4">Sections</h2>
                  <nav className="space-y-1">
                    {sections.map((section) => (
                      <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={`w-full text-left px-3 py-2 rounded-md ${
                          activeSection === section.id
                            ? 'bg-blue-50 text-blue-700'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {section.label}
                      </button>
                    ))}
                  </nav>
                </div>
              </div>

              {/* Content Editor */}
              <div className="flex-1">
                {activeSection === 'hero' && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-medium">Hero Section</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Title</label>
                        <input
                          type="text"
                          value={content.hero.title}
                          onChange={(e) => updateContent('hero.title', e.target.value)}
                          className="mt-1 block w-full border rounded-md shadow-sm p-2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Subtitle</label>
                        <input
                          type="text"
                          value={content.hero.subtitle}
                          onChange={(e) => updateContent('hero.subtitle', e.target.value)}
                          className="mt-1 block w-full border rounded-md shadow-sm p-2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                          value={content.hero.description}
                          onChange={(e) => updateContent('hero.description', e.target.value)}
                          rows={3}
                          className="mt-1 block w-full border rounded-md shadow-sm p-2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Button Text</label>
                        <input
                          type="text"
                          value={content.hero.button.text}
                          onChange={(e) => updateContent('hero.button.text', e.target.value)}
                          className="mt-1 block w-full border rounded-md shadow-sm p-2"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {activeSection === 'callToAction' && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-medium">Call to Action Section</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Title</label>
                        <input
                          type="text"
                          value={content.callToAction.title}
                          onChange={(e) => updateContent('callToAction.title', e.target.value)}
                          className="mt-1 block w-full border rounded-md shadow-sm p-2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Subtitle</label>
                        <input
                          type="text"
                          value={content.callToAction.subtitle}
                          onChange={(e) => updateContent('callToAction.subtitle', e.target.value)}
                          className="mt-1 block w-full border rounded-md shadow-sm p-2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Button Text</label>
                        <input
                          type="text"
                          value={content.callToAction.button.text}
                          onChange={(e) => updateContent('callToAction.button.text', e.target.value)}
                          className="mt-1 block w-full border rounded-md shadow-sm p-2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Features</label>
                        {content.callToAction.features.map((feature, index) => (
                          <div key={index} className="flex gap-2 mt-2">
                            <input
                              type="text"
                              value={feature}
                              onChange={(e) => {
                                const newFeatures = [...content.callToAction.features];
                                newFeatures[index] = e.target.value;
                                updateContent('callToAction.features', newFeatures);
                              }}
                              className="block w-full border rounded-md shadow-sm p-2"
                            />
                            <button
                              onClick={() => {
                                const newFeatures = content.callToAction.features.filter((_, i) => i !== index);
                                updateContent('callToAction.features', newFeatures);
                              }}
                              className="px-2 py-1 text-red-600 hover:bg-red-50 rounded"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                        <button
                          onClick={() => {
                            const newFeatures = [...content.callToAction.features, ''];
                            updateContent('callToAction.features', newFeatures);
                          }}
                          className="mt-2 text-blue-600 hover:text-blue-700"
                        >
                          + Add Feature
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {activeSection === 'mainValue' && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-medium">Main Value Section</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Title</label>
                        <input
                          type="text"
                          value={content.mainValue.title}
                          onChange={(e) => updateContent('mainValue.title', e.target.value)}
                          className="mt-1 block w-full border rounded-md shadow-sm p-2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Subtitle</label>
                        <input
                          type="text"
                          value={content.mainValue.subtitle}
                          onChange={(e) => updateContent('mainValue.subtitle', e.target.value)}
                          className="mt-1 block w-full border rounded-md shadow-sm p-2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                          value={content.mainValue.description}
                          onChange={(e) => updateContent('mainValue.description', e.target.value)}
                          rows={3}
                          className="mt-1 block w-full border rounded-md shadow-sm p-2"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {activeSection === 'coreBenefits' && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-medium">Core Benefits Section</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Title</label>
                        <input
                          type="text"
                          value={content.coreBenefits.title}
                          onChange={(e) => updateContent('coreBenefits.title', e.target.value)}
                          className="mt-1 block w-full border rounded-md shadow-sm p-2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Subtitle</label>
                        <input
                          type="text"
                          value={content.coreBenefits.subtitle}
                          onChange={(e) => updateContent('coreBenefits.subtitle', e.target.value)}
                          className="mt-1 block w-full border rounded-md shadow-sm p-2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                          value={content.coreBenefits.description}
                          onChange={(e) => updateContent('coreBenefits.description', e.target.value)}
                          rows={3}
                          className="mt-1 block w-full border rounded-md shadow-sm p-2"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {activeSection === 'uniqueApproach' && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-medium">Unique Approach Section</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Title</label>
                        <input
                          type="text"
                          value={content.uniqueApproach.title}
                          onChange={(e) => updateContent('uniqueApproach.title', e.target.value)}
                          className="mt-1 block w-full border rounded-md shadow-sm p-2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Subtitle</label>
                        <input
                          type="text"
                          value={content.uniqueApproach.subtitle}
                          onChange={(e) => updateContent('uniqueApproach.subtitle', e.target.value)}
                          className="mt-1 block w-full border rounded-md shadow-sm p-2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                          value={content.uniqueApproach.description}
                          onChange={(e) => updateContent('uniqueApproach.description', e.target.value)}
                          rows={3}
                          className="mt-1 block w-full border rounded-md shadow-sm p-2"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {activeSection === 'socialProof' && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-medium">Social Proof Section</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Title</label>
                        <input
                          type="text"
                          value={content.socialProof.title}
                          onChange={(e) => updateContent('socialProof.title', e.target.value)}
                          className="mt-1 block w-full border rounded-md shadow-sm p-2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Subtitle</label>
                        <input
                          type="text"
                          value={content.socialProof.subtitle}
                          onChange={(e) => updateContent('socialProof.subtitle', e.target.value)}
                          className="mt-1 block w-full border rounded-md shadow-sm p-2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                          value={content.socialProof.description}
                          onChange={(e) => updateContent('socialProof.description', e.target.value)}
                          rows={3}
                          className="mt-1 block w-full border rounded-md shadow-sm p-2"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
