import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WizardLayout from '../components/wizard/WizardLayout';
import Step1Photo from '../components/wizard/Step1Photo';
import Step2BasicInfo from '../components/wizard/Step2BasicInfo';
import Step3Taste from '../components/wizard/Step3Taste';
import Step4Final from '../components/wizard/Step4Final';
import { submitWineEntry, type WineSubmission } from '../services/api';

interface WineWizardData {
    // Step 1
    photo?: string;
    // Step 2
    nameKr?: string;
    nameEn?: string;
    vintage?: string;
    country?: string;
    // Step 3
    body?: number;
    tannin?: number;
    acidity?: number;
    sweetness?: number;
    aromas?: string[];
    // Step 4
    date?: string;
    price?: string;
    note?: string;
    rating?: number;
}

export default function WineWizard() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [wineData, setWineData] = useState<WineWizardData>({
        // Default values
        body: 3,
        tannin: 3,
        acidity: 3,
        sweetness: 3,
        aromas: [],
        rating: 0,
        date: new Date().toISOString().split('T')[0]
    });

    const updateData = (data: Partial<WineWizardData>) => {
        setWineData(prev => ({ ...prev, ...data }));
    };

    const handleStep1Next = (photoData: string) => {
        updateData({ photo: photoData });
        setStep(2);
    };

    const handleStep2Next = (data: any) => {
        updateData(data);
        setStep(3);
    };

    const handleStep3Next = (data: any) => {
        updateData(data);
        setStep(4);
    };

    const handleStep4Submit = async (data: any) => {
        // Final update before submitting
        const finalData = { ...wineData, ...data };
        updateData(data);

        // Validation: Name is absolute minimum?
        // User requested "no validation blocking navigation", but for submission we likely need name.
        if (!finalData.nameKr && !finalData.nameEn) {
            alert('와인 이름(한글 또는 영문)은 필수입니다. 2단계에서 입력해주세요.');
            setStep(2);
            return;
        }

        try {
            setIsSubmitting(true);

            // Map to API format
            const submission: WineSubmission = {
                nameEn: finalData.nameEn || finalData.nameKr || 'Unknown Wine', // Fallback
                nameKr: finalData.nameKr,
                vintage: parseInt(finalData.vintage || '0') || undefined,
                type: 'Red', // TODO: Add Type selection in Step 2 if not present? Defaulting to Red
                country: finalData.country,
                price: parseFloat(finalData.price || '0'),
                rating: finalData.rating || 0,
                date: finalData.date || new Date().toISOString().split('T')[0],
                note: finalData.note,
                // These fields depend on API support for extra props
                // If API definition in api.ts allows [key: string]: any, this works.
                body: finalData.body,
                tannin: finalData.tannin,
                acidity: finalData.acidity,
                sweetness: finalData.sweetness,
                aromas: finalData.aromas,
                image: finalData.photo
            };

            await submitWineEntry(submission);

            alert('와인이 성공적으로 등록되었습니다!');
            navigate('/cellar');

        } catch (error: any) {
            console.error('Submission failed:', error);
            alert(`등록 실패: ${error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleBack = () => {
        if (step > 1) {
            setStep(step - 1);
        } else {
            navigate(-1);
        }
    };

    const handleStepClick = (targetStep: number) => {
        setStep(targetStep);
    };

    const getTitle = () => {
        switch (step) {
            case 1: return "와인 등록";
            case 2: return "기본 정보";
            case 3: return "맛과 향";
            case 4: return "최종 기록";
            default: return "와인 등록";
        }
    };

    return (
        <WizardLayout
            currentStep={step}
            totalSteps={4}
            onBack={handleBack}
            onStepClick={handleStepClick}
            title={getTitle()}
            previewImage={wineData.photo}
        >
            {step === 1 && (
                <Step1Photo onNext={handleStep1Next} initialPhoto={wineData.photo} />
            )}
            {step === 2 && (
                <Step2BasicInfo onNext={handleStep2Next} initialData={wineData} />
            )}
            {step === 3 && (
                <Step3Taste onNext={handleStep3Next} initialData={wineData} />
            )}
            {step === 4 && (
                <Step4Final onSubmit={handleStep4Submit} initialData={wineData} isSubmitting={isSubmitting} />
            )}
        </WizardLayout>
    );
}
