import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function FontPreview() {
    const navigate = useNavigate();

    const fontsSophisticated = [
        {
            name: '1. Pretendard (프리텐다드)',
            fontFamily: "font-['Pretendard']",
            description: '현재 IT 업계 표준으로 불리는 가장 세련되고 깔끔한 폰트입니다.',
            weight: 'font-light'
        },
        {
            name: '2. Wanted Sans (원티드 산스)',
            fontFamily: "font-['Wanted_Sans']",
            description: '가독성과 균형미가 뛰어난 최신 폰트입니다. 군더더기 없습니다.',
            weight: 'font-normal'
        },
        {
            name: '3. NanumSquare Neo (나눔스퀘어 네오)',
            fontFamily: "font-['NanumSquareNeo']",
            description: '직선적인 매력의 나눔스퀘어를 현대적으로 다듬어 매우 안정적입니다.',
            weight: 'font-normal'
        },
        {
            name: '4. SUIT (수트)',
            fontFamily: "font-['SUIT']",
            description: '기하학적인 곡선이 특징인 모던 폰트입니다. 정장처럼 깔끔합니다.',
            weight: 'font-light'
        },
        {
            name: '5. Nexon Lv1 Gothic (넥슨 고딕)',
            fontFamily: "font-['NexonLv1Gothic']",
            description: '화면에서 가장 잘 보이도록 설계된 얇고 맑은 고딕체입니다.',
            weight: 'font-light'
        }
    ];

    const fontsWineVibe = [
        {
            name: '6. Mapo Flower Island (마포꽃섬)',
            fontFamily: "font-['MapoFlowerIsland']",
            description: '섬세하고 우아한 느낌의 산세리프입니다. 꺾임이 없지만 감성적입니다.',
            weight: 'font-normal'
        },
        {
            name: '7. Cafe24 Ssurround Air (써라운드 에어)',
            fontFamily: "font-['Cafe24SsurroundAir']",
            description: '둥글고 부드러운 라인이 와인의 향과 바디감을 연상시킵니다.',
            weight: 'font-light'
        },
        {
            name: '8. Gmarket Sans (지마켓 산스)',
            fontFamily: "font-['GmarketSansMedium']",
            description: '이미 보셨던 폰트로, 네모 반듯하면서도 트렌디한 느낌을 줍니다.',
            weight: 'font-light'
        },
        {
            name: '9. Leferi Base (레페리 베이스)',
            fontFamily: "font-['LeferiBase']",
            description: '산세리프의 깔끔함 속에 아주 미세한 곡선미를 더해 고급스럽습니다.',
            weight: 'font-bold'
        },
        {
            name: '10. PyeongChang Peace (평창평화체)',
            fontFamily: "font-['PyeongChangPeace']",
            description: '사선으로 뻗은 획이 유니크하며, 샴페인이나 스파클링 와인처럼 경쾌합니다.',
            weight: 'font-light'
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
                <h1 className="text-lg font-serif font-bold text-wine-900">폰트 미리보기 (10종)</h1>
            </header>

            <div className="p-4 space-y-8">
                <p className="text-sm text-stone-500 bg-white p-3 rounded-lg border border-stone-200">
                    아래 폰트 중 마음에 드는 스타일을 골라주세요.<br />
                    (실제 적용 시 굵기 및 크기는 조정될 수 있습니다.)
                </p>

                {/* Section 1 */}
                <section>
                    <h2 className="text-sm font-bold text-stone-900 mb-3 px-1 border-l-4 border-stone-800 pl-2">
                        A. 세련되고 도시적인 느낌
                    </h2>
                    <div className="space-y-4">
                        {fontsSophisticated.map((font, index) => (
                            <div key={index} className="bg-white rounded-xl p-5 shadow-sm border border-stone-100">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">{font.name}</span>
                                </div>
                                <div className={`text-2xl text-stone-800 mb-3 ${font.fontFamily} ${font.weight}`}>
                                    {sampleText}
                                </div>
                                <div className={`text-sm text-stone-600 mb-4 ${font.fontFamily} ${font.weight}`}>
                                    Château Margaux 2015
                                </div>
                                <p className="text-xs text-stone-500 leading-relaxed border-t border-stone-100 pt-3">
                                    {font.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Section 2 */}
                <section>
                    <h2 className="text-sm font-bold text-wine-900 mb-3 px-1 border-l-4 border-wine-800 pl-2">
                        B. 와인과 어울리는 유니크한 감성
                    </h2>
                    <div className="space-y-4">
                        {fontsWineVibe.map((font, index) => (
                            <div key={index} className="bg-white rounded-xl p-5 shadow-sm border border-stone-100">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-xs font-bold text-wine-300 uppercase tracking-wider">{font.name}</span>
                                </div>
                                <div className={`text-2xl text-stone-800 mb-3 ${font.fontFamily} ${font.weight}`}>
                                    {sampleText}
                                </div>
                                <div className={`text-sm text-stone-600 mb-4 ${font.fontFamily} ${font.weight}`}>
                                    Château Margaux 2015
                                </div>
                                <p className="text-xs text-stone-500 leading-relaxed border-t border-stone-100 pt-3">
                                    {font.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
