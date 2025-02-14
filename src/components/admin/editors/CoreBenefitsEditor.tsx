import { CoreBenefitsContent } from '../../../types/content';

interface CoreBenefitsEditorProps {
  content: CoreBenefitsContent;
  onChange: (newContent: CoreBenefitsContent) => void;
}

export default function CoreBenefitsEditor({ content, onChange }: CoreBenefitsEditorProps) {
  const handleBenefitChange = (index: number, field: keyof typeof content.benefits[0], value: string) => {
    const newBenefits = [...content.benefits];
    newBenefits[index] = {
      ...newBenefits[index],
      [field]: value,
    };
    onChange({
      ...content,
      benefits: newBenefits,
    });
  };

  const addBenefit = () => {
    onChange({
      ...content,
      benefits: [
        ...content.benefits,
        { title: '', description: '', icon: 'default-icon' },
      ],
    });
  };

  const removeBenefit = (index: number) => {
    const newBenefits = content.benefits.filter((_, i) => i !== index);
    onChange({
      ...content,
      benefits: newBenefits,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Section Title
        </label>
        <input
          type="text"
          value={content.title}
          onChange={(e) => onChange({ ...content, title: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Section Subtitle
        </label>
        <input
          type="text"
          value={content.subtitle}
          onChange={(e) => onChange({ ...content, subtitle: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Benefits</h3>
          <button
            onClick={addBenefit}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Add Benefit
          </button>
        </div>

        <div className="space-y-6">
          {content.benefits.map((benefit, index) => (
            <div key={index} className="p-4 border rounded-lg relative">
              <button
                onClick={() => removeBenefit(index)}
                className="absolute top-2 right-2 text-red-600 hover:text-red-700"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={benefit.title}
                    onChange={(e) => handleBenefitChange(index, 'title', e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={benefit.description}
                    onChange={(e) => handleBenefitChange(index, 'description', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Icon
                  </label>
                  <input
                    type="text"
                    value={benefit.icon}
                    onChange={(e) => handleBenefitChange(index, 'icon', e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
