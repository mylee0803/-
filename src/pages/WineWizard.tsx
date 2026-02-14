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

const swipeConfidenceThreshold = 200;
const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
};

export default function WineWizard() {
    // ... (existing code)

    // Debug State (Temporary) - For verifying mobile deployment
    const [debugLog, setDebugLog] = useState<string>('Ready');

    return (
        <WizardLayout
            currentStep={step}
            totalSteps={4}
            onBack={handleBack}
            onStepClick={jumpToStep}
            title={getTitle()}
            previewImage={wineData.photo}
        >
            {/* Version & Debug Tag */}
            <div className="absolute top-14 right-2 z-50 bg-blue-600 text-white text-[10px] px-1.5 py-0.5 rounded opacity-90 pointer-events-none font-mono">
                v1.0.4 | {new Date().toISOString().slice(11, 19)} | {debugLog}
            </div>

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
                    dragElastic={0.5}
                    dragListener={true}
                    dragPropagation={true}
                    style={{ touchAction: 'pan-y' }}
                    onPointerDownCapture={(e) => {
                        // Force capture touch to ensure drag starts
                    }}
                    onDragEnd={(_, { offset, velocity }) => {
                        const swipe = swipePower(offset.x, velocity.x);
                        setDebugLog(`S:${swipe.toFixed(0)} O:${offset.x.toFixed(0)}`);

                        // Enhanced sensitivity logic
                        // If offset is very small (e.g. 1~5px) but we have significant velocity?
                        // Or just trust the low threshold of 20px.
                        // With touchAction='pan-y' on children, O should be normal again.
                        if (swipe < -swipeConfidenceThreshold || offset.x < -20) {
                            paginate(1);
                        } else if (swipe > swipeConfidenceThreshold || offset.x > 20) {
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
