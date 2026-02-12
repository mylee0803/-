import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function FontPreview() {
    const navigate = useNavigate();

    const fonts = [
        {
            name: 'NanumSquare (나눔스퀘어)',
            fontFamily: "font-['NanumSquare']",
            description: '직선적이고 모던한 제목용 폰트입니다. 가장 깔끔하고 대중적인 선택지입니다.'
        },
        {
            name: 'Gmarket Sans (Gmarket Sans)',
            fontFamily: "font-['GmarketSansMedium']",
            description: '네모 반듯하면서도 친근한 느낌을 줍니다. 가독성이 뛰어나고 트렌디합니다.'
        },
        {
            name: 'Hahmlet (함렛)',
            fontFamily: "font-['Hahmlet']",
            description: '단단한 느낌의 현대적인 잉크 트랩 폰트입니다. 세리프와 산세리프의 장점을 결합했습니다.'
        },
        {
            name: 'Gowun Dodum (고운돋움)',
            fontFamily: "font-['Gowun_Dodum']",
            description: '동글동글하고 부드러운 느낌의 돋움체입니다. 귀엽지만 가독성이 좋습니다.'
        },
        {
            name: 'Sunflower (해바라기)',
            fontFamily: "font-['Sunflower']",
            description: '레트로한 감성이 묻어나는 직선적인 고딕체입니다. 개성 있는 제목에 어울립니다.'
        }
    ];

    const sampleText = "제가 이 폰트의 예시입니다";

    return (
        <div className="min-h-screen bg-stone-50 pb-20">
            {/* Header */}
            <header className="bg-white border-b border-stone-200 sticky top-0 z-10 px-4 h-14 flex items-center gap-3">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 -ml-2 text-stone-600 hover:bg-stone-100 rounded-full transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <h1 className="text-lg font-serif font-bold text-wine-900">폰트 미리보기</h1>
            </header>

            <div className="p-4 space-y-6">
                <p className="text-sm text-stone-500 mb-4 bg-white p-3 rounded-lg border border-stone-200">
                    아래 폰트 중 마음에 드는 스타일을 골라주세요.<br />
                    (실제 적용 시 굵기 및 크기는 조정될 수 있습니다.)
                </p>

                {fonts.map((font, index) => (
                    <div key={index} className="bg-white rounded-xl p-5 shadow-sm border border-stone-100">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">{font.name}</span>
                        </div>

                        {/* Sample Text Display */}
                        <div className={`text-2xl text-stone-800 mb-3 ${font.fontFamily}`}>
                            {sampleText}
                        </div>

                        {/* Smaller Text Sample */}
                        <div className={`text-sm text-stone-600 mb-4 ${font.fontFamily}`}>
                            와인 다이어리: 나만의 특별한 기록
                        </div>

                        <p className="text-xs text-stone-500 leading-relaxed border-t border-stone-100 pt-3">
                            {font.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
