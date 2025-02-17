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
    <section className="w-full h-[100vh] h-[100svh] min-h-[600px] flex items-center justify-center relative bg-gradient-to-r from-purple-800 to-pink-600 text-white py-12 px-4 sm:px-6 lg:px-8 overflow-hidden scroll-snap-align-start">
      <div className="absolute inset-0 bg-[url('/assets/images/bg/2xl_bg.png')] bg-cover bg-center opacity-5" />
      <div className="w-full max-w-4xl mx-auto relative z-10">
        <div className="text-center">
          <EditableText
            content={localContent.title || ''}
            onChange={(value) => updateContent('mainValue.title', value)}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-poppins font-extralight mb-8 text-center text-[#1a1a1a] leading-[1.2] [text-shadow:1px_1px_4px_rgba(0,0,0,0.15)]"
            as="h2"
          />
          
          <EditableText
            content={localContent.description || ''}
            onChange={(value) => updateContent('mainValue.description', value)}
            className="text-xl sm:text-2xl mb-12 text-gray-100 mx-auto [text-shadow:0px_2px_4px_rgba(0,0,0,0.1)] leading-[1.5] max-w-[800px]"
          />

          <div className="bg-white/[0.12] backdrop-blur-sm rounded-2xl p-8 mb-12 max-w-2xl mx-auto shadow-[0_4px_12px_rgba(0,0,0,0.1),inset_0px_2px_10px_rgba(0,0,0,0.1)] border border-white/10">
            <EditableText
              content={localContent.subtitle || ''}
              onChange={(value) => updateContent('mainValue.subtitle', value)}
              className="text-2xl sm:text-3xl font-medium mb-8 text-white [text-shadow:0px_2px_4px_rgba(0,0,0,0.1)]"
              as="h3"
            />
            <ul className="text-left text-lg sm:text-xl text-gray-100 space-y-6 leading-[1.4]">
              {(localContent.questions || []).map((question, index) => (
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
                text={localContent.button?.text || ''}
                variant="light" 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MainValueSection;