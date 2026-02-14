import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

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
    variety?: string;
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

const variants = {
    enter: (direction: number) => ({
        x: direction > 0 ? 1000 : -1000,
        opacity: 0
    }),
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1
    },
    exit: (direction: number) => ({
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0
    })
};

const swipeConfidenceThreshold = 1000;
const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
};

export default function WineWizard() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [direction, setDirection] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Consolidated Data State
    const [wineData, setWineData] = useState<WineWizardData>({
        body: 3,
        tannin: 3,
        acidity: 3,
        sweetness: 3,
        aromas: [],
        rating: 0,
        date: new Date().toISOString().split('T')[0]
    });

    // Real-time data sync handler
    const updateData = (data: Partial<WineWizardData>) => {
        setWineData(prev => ({ ...prev, ...data }));
    };

    const paginate = (newDirection: number) => {
        const nextStep = step + newDirection;
        if (nextStep < 1 || nextStep > 4) return;
        setDirection(newDirection);
        setStep(nextStep);
    };

    // For direct jumps (progress bar)
    const jumpToStep = (targetStep: number) => {
        setDirection(targetStep > step ? 1 : -1);
        setStep(targetStep);
    };

    const handleStep4Submit = async () => {
        // Basic Validation
        if (!wineData.nameKr && !wineData.nameEn) {
            alert('와인 이름(한글 또는 영문)은 필수입니다. 2단계에서 입력해주세요.');
            jumpToStep(2);
            return;
        }

        try {
            setIsSubmitting(true);

            const submission: WineSubmission = {
                nameEn: wineData.nameEn || wineData.nameKr || 'Unknown Wine',
                nameKr: wineData.nameKr,
                vintage: parseInt(wineData.vintage || '0') || undefined,
                type: 'Red',
                country: wineData.country,
                variety: wineData.variety,
                price: parseFloat(wineData.price || '0'),
                rating: wineData.rating || 0,
                date: wineData.date || new Date().toISOString().split('T')[0],
                note: wineData.note,
                body: wineData.body,
                tannin: wineData.tannin,
                acidity: wineData.acidity,
                sweetness: wineData.sweetness,
                aromas: wineData.aromas,
                image: wineData.photo
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
            paginate(-1);
        } else {
            navigate(-1);
        }
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
            onStepClick={jumpToStep}
            title={getTitle()}
            previewImage={wineData.photo}
        >
            <AnimatePresence initial={false} custom={direction} mode='popLayout'>
                <motion.div
                    key={step}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2 }
                    }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={1}
                    dragPropagation={true}
                    onDragEnd={(_, { offset, velocity }) => {
                        const swipe = swipePower(offset.x, velocity.x);

                        if (swipe < -swipeConfidenceThreshold || offset.x < -50) {
                            paginate(1);
                        } else if (swipe > swipeConfidenceThreshold || offset.x > 50) {
                            paginate(-1);
                        }
                    }}
                    className="absolute top-0 left-0 w-full h-full overflow-y-auto bg-stone-50"
                >
                    {step === 1 && (
                        <Step1Photo onNext={() => paginate(1)} initialPhoto={wineData.photo} updateData={updateData} />
                    )}
                    {step === 2 && (
                        <Step2BasicInfo onNext={() => paginate(1)} initialData={wineData} updateData={updateData} />
                    )}
                    {step === 3 && (
                        <Step3Taste onNext={() => paginate(1)} initialData={wineData} updateData={updateData} />
                    )}
                    {step === 4 && (
                        <Step4Final onSubmit={handleStep4Submit} initialData={wineData} isSubmitting={isSubmitting} updateData={updateData} />
                    )}
                </motion.div>
            </AnimatePresence>
        </WizardLayout>
    );
}
