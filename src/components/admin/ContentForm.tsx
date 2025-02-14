import React, { useState, useEffect } from 'react';
import { LandingPageContent } from '../../types/content';

interface ContentFormProps {
  initialContent: LandingPageContent;
  onSave: (content: LandingPageContent) => Promise<void>;
}

export default function ContentForm({ initialContent, onSave }: ContentFormProps) {
  const [content, setContent] = useState<LandingPageContent>(initialContent);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    
    try {
      await onSave(content);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save content');
    } finally {
      setSaving(false);
    }
  };

  const updateSection = (sectionName: keyof LandingPageContent, value: any) => {
    setContent(prev => ({
      ...prev,
      [sectionName]: value
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Edit Landing Page Content</h1>
      
      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Hero Section */}
        <section className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Hero Section</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                value={content.hero.title}
                onChange={e => updateSection('hero', { ...content.hero, title: e.target.value })}
                className="mt-1 block w-full border rounded-md shadow-sm p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Subtitle</label>
              <input
                type="text"
                value={content.hero.subtitle}
                onChange={e => updateSection('hero', { ...content.hero, subtitle: e.target.value })}
                className="mt-1 block w-full border rounded-md shadow-sm p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={content.hero.description}
                onChange={e => updateSection('hero', { ...content.hero, description: e.target.value })}
                className="mt-1 block w-full border rounded-md shadow-sm p-2"
                rows={3}
              />
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Call to Action Section</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                value={content.callToAction.title}
                onChange={e => updateSection('callToAction', { ...content.callToAction, title: e.target.value })}
                className="mt-1 block w-full border rounded-md shadow-sm p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Subtitle</label>
              <input
                type="text"
                value={content.callToAction.subtitle}
                onChange={e => updateSection('callToAction', { ...content.callToAction, subtitle: e.target.value })}
                className="mt-1 block w-full border rounded-md shadow-sm p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Button Text</label>
              <input
                type="text"
                value={content.callToAction.button.text}
                onChange={e => updateSection('callToAction', { 
                  ...content.callToAction, 
                  button: { ...content.callToAction.button, text: e.target.value }
                })}
                className="mt-1 block w-full border rounded-md shadow-sm p-2"
              />
            </div>
          </div>
        </section>

        {/* Add more sections as needed */}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}
