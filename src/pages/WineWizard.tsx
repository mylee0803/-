import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WizardLayout from '../components/wizard/WizardLayout';
import Step1Photo from '../components/wizard/Step1Photo';

export default function WineWizard() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [wineData, setWineData] = useState<{
        photo?: string;
        // extended later for other steps
    }>({});

    const handleStep1Next = (photoData: string) => {
        setWineData(prev => ({ ...prev, photo: photoData }));
        // For now, since only Step 1 is implemented, we just log and maybe alert
        console.log('Step 1 Complete. Photo data length:', photoData.length);
        alert('1단계 완료! 다음 단계는 개발 중입니다.');
        // setStep(2); // Uncomment when Step 2 is ready
    };

    const handleBack = () => {
        if (step > 1) {
            setStep(step - 1);
        } else {
            navigate(-1);
        }
    };

    return (
        <WizardLayout
            currentStep={step}
            totalSteps={4}
            onBack={handleBack}
            title="와인 등록"
        >
            {step === 1 && (
                <Step1Photo onNext={handleStep1Next} initialPhoto={wineData.photo} />
            )}
            {/* Future steps will be added here */}
        </WizardLayout>
    );
}
