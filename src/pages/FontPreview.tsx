import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function FontPreview() {
    const navigate = useNavigate();

    const fontsSophisticated = [
        {
            name: '1. The Jamsil (더 잠실)',
            fontFamily: "font-['TheJamsil']",
            description: '롯데마트의 아이덴티티를 담은 모던하고 단단한 서체입니다. 힘이 느껴집니다.',
            weight: 'font-light'
        },
        {
            name: '2. LINE Seed KR (라인 씨드)',
            fontFamily: "font-['LINESeedKR-Bd']",
            description: '기하학적인 모양이 돋보이는 라인의 전용 서체입니다. 깔끔함의 정석입니다.',
            weight: 'font-normal'
        },
        {
            name: '3. Spoqa Han Sans Neo (스포카 한 산스)',
            fontFamily: "font-['SpoqaHanSansNeo-Regular']",
            description: '한국어 UI에 최적화된 서체로, 숫자가 특히 예쁘고 가독성이 완벽합니다.',
            weight: 'font-normal'
        },
        {
            name: '4. Elice Digital Baeum (엘리스 배움체)',
            fontFamily: "font-['EliceDigitalBaeum']",
            description: '잉크 트랩(홈)이 독특한 매력을 주는 서체입니다. 스마트해 보입니다.',
            weight: 'font-normal'
        },
        {
            name: '5. S-Core Dream (에스코어 드림)',
            fontFamily: "font-['S-CoreDream-3Light']",
            description: '꽉 찬 직사각형 구조로 시원시원한 느낌을 줍니다. 제목용으로 훌륭합니다.',
            weight: 'font-normal'
        }
    ];

    const fontsWineVibe = [
        {
            name: '6. Mapo Flower Island (마포꽃섬) - Current Pick',
            fontFamily: "font-['MapoFlowerIsland']",
            description: '현재 선택하신 폰트입니다. 산세리프지만 꽃잎처럼 섬세한 끝처리가 우아합니다.',
            weight: 'font-normal'
        },
        {
            name: '7. Tmoney RoundWind (티머니 둥근바람)',
            fontFamily: "font-['TmoneyRoundWind']",
            description: '바람이 불듯 둥글고 부드러운 서체입니다. 와인의 부드러움을 표현하기 좋습니다.',
            weight: 'font-normal'
        },
        {
            name: '8. Cafe24 Ssurround (써라운드)',
            fontFamily: "font-['Cafe24Ssurround']",
            description: '동글동글한 모서리가 특징적인 폰트입니다. 귀엽고 친근한 분위기를 냅니다.',
            weight: 'font-normal'
        },
        {
            name: '9. Chosun Centennial (조선100년체)',
            fontFamily: "font-['ChosunCentennial']",
            description: '고딕체 베이스에 명조의 획을 살짝 가미하여 고전미와 현대미가 공존합니다.',
            weight: 'font-normal'
        },
        {
            name: '10. Gyeonggi Title (경기천년제목)',
            fontFamily: "font-['GyeonggiTitleM']",
            description: '역사적인 느낌을 현대적으로 재해석한 서체입니다. 전통미와 신뢰감을 줍니다.',
            weight: 'font-normal'
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
