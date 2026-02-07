
import React, { useEffect, useRef, useState } from 'react';
import { PROJECTS, BUSINESSES } from './constants';
import { ChevronRight, Download, MapPin, Calendar, Compass, Info, Menu, X, ArrowDown, Map as MapIcon } from 'lucide-react';

const InteractiveMap = ({ activeIndex, onSelect }: { activeIndex: number, onSelect: (idx: number) => void }) => {
  return (
    <div className="relative w-full max-w-2xl mx-auto h-[400px] md:h-[500px]">
      <svg viewBox="0 0 400 600" className="w-full h-full drop-shadow-2xl">
        {/* Simplified Coastline Path */}
        <path 
          d="M 50,50 Q 80,100 70,200 T 100,350 T 60,550" 
          fill="none" 
          stroke="#8cc280" 
          strokeWidth="6" 
          strokeLinecap="round"
          className="opacity-50"
        />
        <path 
          d="M 50,50 Q 80,100 70,200 T 100,350 T 60,550" 
          fill="none" 
          stroke="#f0ea30" 
          strokeWidth="2" 
          strokeDasharray="10 5"
          className="opacity-80"
        />

        {/* Project Markers */}
        {PROJECTS.map((p, idx) => {
          // Positions corresponding to North-to-South distribution
          const positions = [
            { x: 65, y: 80 },  // Zhuwei (North)
            { x: 85, y: 280 }, // Yongan
            { x: 85, y: 400 }, // Xinwu
            { x: 75, y: 220 }  // Connection (Represented as a segment node)
          ];
          const pos = positions[idx];
          const isActive = activeIndex === idx;

          return (
            <g 
              key={p.id} 
              className="cursor-pointer transition-all duration-300 group"
              onClick={() => onSelect(idx)}
              onMouseEnter={() => onSelect(idx)}
            >
              <circle 
                cx={pos.x} 
                cy={pos.y} 
                r={isActive ? "12" : "8"} 
                fill={isActive ? "#EE7800" : "#f0ea30"} 
                className="transition-all duration-500 animate-pulse"
              />
              <circle 
                cx={pos.x} 
                cy={pos.y} 
                r={isActive ? "20" : "15"} 
                fill="none" 
                stroke={isActive ? "#EE7800" : "#f0ea30"} 
                strokeWidth="2" 
                className={`transition-all duration-500 ${isActive ? 'opacity-100 scale-125' : 'opacity-30'}`}
              />
              <text 
                x={pos.x + 25} 
                y={pos.y + 5} 
                fill={isActive ? "#f0ea30" : "white"} 
                className={`text-[14px] font-bold tracking-wider transition-all duration-300 pointer-events-none ${isActive ? 'translate-x-2' : 'opacity-60'}`}
              >
                {p.title}
              </text>
            </g>
          );
        })}

        {/* Map Annotations */}
        <text x="30" y="30" fill="#8cc280" className="text-[10px] font-bold uppercase tracking-[4px]">Taoyuan Coastline</text>
        <text x="30" y="580" fill="#8cc280" className="text-[10px] font-bold uppercase tracking-[4px]">Southern Link</text>
      </svg>
      
      {/* Floating Info Tooltip */}
      <div className="absolute bottom-4 right-4 glass-morphism p-4 rounded-xl border border-white/10 max-w-[200px] animate-fade-in-up">
        <p className="text-xs text-secondary font-bold mb-1 uppercase tracking-widest">目前選取</p>
        <p className="text-lg font-bold text-accentYellow">{PROJECTS[activeIndex].title}</p>
        <p className="text-xs text-gray-400 mt-2">{PROJECTS[activeIndex].subtitle}</p>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [activeProject, setActiveProject] = useState<number>(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      const sections = document.querySelectorAll('.project-section');
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top >= -200 && rect.top <= window.innerHeight / 2) {
          setActiveProject(index);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80; // Account for fixed header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setMobileMenuOpen(false);
  };

  const handleMapSelect = (idx: number) => {
    setActiveProject(idx);
    const id = PROJECTS[idx].id;
    scrollToSection(id);
  };

  return (
    <div className="relative min-h-screen">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'glass-morphism py-3 shadow-lg' : 'bg-transparent py-5'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollToSection('home')}>
            <img src="https://i.meee.com.tw/f0soMtc.png" alt="Logo" className="h-10 md:h-12 w-auto" />
            <div className="h-8 w-[1px] bg-white/20 hidden md:block"></div>
            <span className="text-lg font-bold tracking-tighter hidden md:block">珍珠海岸重生故事</span>
          </div>
          
          {/* Main Desktop Anchors */}
          <div className="hidden md:flex gap-8 text-sm font-medium uppercase tracking-widest">
            <button onClick={() => scrollToSection('home')} className="hover:text-accentYellow transition-colors relative group">
              首頁
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-accentYellow transition-all group-hover:w-full"></span>
            </button>
            <button onClick={() => scrollToSection('transformation')} className="hover:text-accentYellow transition-colors relative group">
              蛻變計畫
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-accentYellow transition-all group-hover:w-full"></span>
            </button>
            <button onClick={() => scrollToSection('projects')} className="hover:text-accentYellow transition-colors relative group">
              四大建設
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-accentYellow transition-all group-hover:w-full"></span>
            </button>
            <button onClick={() => scrollToSection('partners')} className="hover:text-accentYellow transition-colors relative group">
              在地夥伴
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-accentYellow transition-all group-hover:w-full"></span>
            </button>
            <button onClick={() => scrollToSection('download')} className="hover:text-accentYellow transition-colors relative group">
              資料下載
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-accentYellow transition-all group-hover:w-full"></span>
            </button>
          </div>

          <button className="md:hidden p-2 text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay - Anchor Links */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-primary/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 text-2xl font-serif animate-fade-in-up">
          <button onClick={() => setMobileMenuOpen(false)} className="absolute top-6 right-6 p-4"><X size={32}/></button>
          <button onClick={() => scrollToSection('home')} className="hover:text-accentYellow">首頁</button>
          <button onClick={() => scrollToSection('transformation')} className="hover:text-accentYellow">蛻變計畫</button>
          <button onClick={() => scrollToSection('projects')} className="hover:text-accentYellow">四大建設</button>
          <button onClick={() => scrollToSection('partners')} className="hover:text-accentYellow">在地夥伴</button>
          <button onClick={() => scrollToSection('download')} className="hover:text-accentYellow">資料下載</button>
        </div>
      )}

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://i.meee.com.tw/2dHlKUD.jpg" 
            className="w-full h-full object-cover opacity-70 scale-105" 
            alt="Hero Background" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/30 via-transparent to-primary"></div>
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-5xl">
          <h2 className="text-secondary font-bold tracking-[0.5em] mb-4 animate-fade-in-up uppercase">Taoyuan Pearl Coast</h2>
          <h1 className="text-5xl md:text-9xl font-serif italic mb-8 animate-fade-in-up drop-shadow-lg" style={{ animationDelay: '0.2s' }}>
            海岸重生故事
          </h1>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-white/90 leading-relaxed mb-12 animate-fade-in-up font-light" style={{ animationDelay: '0.4s' }}>
            從生硬的政策轉譯為引人入勝的海濱視覺微電影。<br className="hidden md:block" /> 
            透過 Scrollytelling 滾動式敘事，邀您一同見證桃園珍珠海岸的璀璨轉身。
          </p>
          <div className="flex flex-col items-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <button 
              onClick={() => scrollToSection('transformation')}
              className="px-10 py-4 bg-accentOrange hover:bg-orange-600 text-white rounded-full font-bold transition-all transform hover:scale-105 shadow-xl hover:shadow-orange-500/20"
            >
              開啟探索旅程
            </button>
            <div className="mt-16 flex flex-col items-center gap-3 opacity-60">
              <span className="text-[10px] uppercase tracking-[0.3em]">Scroll to experience</span>
              <div className="scroll-indicator"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline & Interactive Map Section */}
      <section id="transformation" className="py-24 md:py-32 bg-primary relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">珍珠蛻變進行式</h2>
            <p className="text-secondary tracking-widest uppercase text-sm font-bold">Spatial & Temporal Transformation</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            <div className="order-2 lg:order-1">
              <InteractiveMap activeIndex={activeProject} onSelect={handleMapSelect} />
            </div>
            
            <div className="space-y-12 order-1 lg:order-2">
              <div className="relative pl-12 border-l border-white/10">
                <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-secondary border-4 border-primary"></div>
                <h4 className="text-2xl font-bold mb-4 flex items-center gap-3">
                  <span className="text-secondary font-serif italic">113</span> 計畫啟動與環境調查
                </h4>
                <p className="text-gray-400 leading-relaxed">
                  深入在地訪談，盤點既有觀光資源與生態敏感區。建立跨部門協作平台，打破以往單點建設的侷限，將目光投向整條海岸線的永續發展。
                </p>
              </div>
              <div className="relative pl-12 border-l border-white/10">
                <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-accentOrange border-4 border-primary"></div>
                <h4 className="text-2xl font-bold mb-4 flex items-center gap-3">
                  <span className="text-accentOrange font-serif italic">114</span> 全面施工與服務優化
                </h4>
                <p className="text-gray-400 leading-relaxed">
                  四大建設同步啟動。不僅是硬體的修復，更是服務流程的再造。導入智慧導覽系統，優化夜間安全，讓每一顆「珍珠」展現獨特的光芒。
                </p>
              </div>
              <div className="relative pl-12 border-l border-white/10">
                <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-accentYellow border-4 border-primary"></div>
                <h4 className="text-2xl font-bold mb-4 flex items-center gap-3">
                  <span className="text-accentYellow font-serif italic">115</span> 願景實現與品牌共榮
                </h4>
                <p className="text-gray-400 leading-relaxed">
                  完成串聯工程，建立「桃園珍珠海岸」專屬品牌形象。結合在地夥伴店家，創造循環經濟效益，讓訪客看見的不只是建設，更是海岸新生的願景。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Major Projects - Scrollytelling Section */}
      <section id="projects" className="relative">
        {PROJECTS.map((project, idx) => (
          <div key={project.id} id={project.id} className="project-section min-h-screen sticky top-0 bg-primary flex items-center overflow-hidden">
            {/* Project Background Image */}
            <div className="absolute inset-0 z-0">
              <img src={project.image} className={`w-full h-full object-cover transition-all duration-1000 transform ${activeProject === idx ? 'scale-100 opacity-30' : 'scale-110 opacity-0'}`} alt={project.title} />
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/70 to-transparent"></div>
            </div>
            
            <div className="container mx-auto px-6 relative z-10 py-24">
              <div className={`max-w-4xl transition-all duration-700 transform ${activeProject === idx ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-secondary font-serif italic text-7xl opacity-30">0{idx + 1}</span>
                  <div className="h-[2px] flex-grow max-w-[100px] bg-accentYellow"></div>
                </div>
                
                <h3 className="text-4xl md:text-7xl font-bold mb-4 tracking-tight">{project.title}</h3>
                <p className="text-xl md:text-2xl text-accentYellow mb-10 italic font-light">{project.subtitle}</p>
                
                <div className="grid md:grid-cols-2 gap-10 mb-12">
                  <div className="space-y-8">
                    <div className="flex items-start gap-4 p-6 glass-morphism rounded-2xl border border-white/5">
                      <Compass className="text-secondary mt-1 flex-shrink-0" size={24} />
                      <div>
                        <h5 className="font-bold text-white mb-2 text-lg">計畫起源與設計理念</h5>
                        <p className="text-sm text-gray-300 leading-relaxed">{project.origin}</p>
                        <p className="text-sm text-gray-300 mt-4 font-medium border-t border-white/10 pt-4">{project.design}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-8">
                    <div className="flex items-start gap-4 p-6 glass-morphism rounded-2xl border border-white/5">
                      <Info className="text-accentYellow mt-1 flex-shrink-0" size={24} />
                      <div>
                        <h5 className="font-bold text-white mb-2 text-lg">預計成果與社會效益</h5>
                        <p className="text-sm text-gray-300 leading-relaxed">{project.expected}</p>
                        <div className="mt-4 flex items-center gap-2 text-accentOrange text-sm font-bold">
                          <Calendar size={16} /> {project.progress}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-accentYellow/30 text-accentYellow hover:text-white rounded-full transition-all flex items-center gap-3 group">
                    <MapIcon size={20} /> 探索本區細節 <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Scroll Indicator for Desktop */}
            <div className="absolute right-12 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-4 z-20">
              {PROJECTS.map((_, i) => (
                <button 
                  key={i} 
                  onClick={() => handleMapSelect(i)}
                  className={`w-3 h-3 rounded-full transition-all duration-500 ${activeProject === i ? 'bg-accentYellow scale-150 shadow-[0_0_10px_rgba(240,234,48,0.8)]' : 'bg-white/20 hover:bg-white/40'}`}
                />
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Partners Stories Section */}
      <section id="partners" className="py-24 md:py-32 bg-white text-primary">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">在地夥伴的故事</h2>
            <div className="w-24 h-1.5 bg-accentOrange mx-auto mb-8 rounded-full"></div>
            <p className="text-gray-600 text-lg leading-relaxed">
              珍珠海岸的重生不僅是景觀的改善，更是連結人與土地的情感紐帶。透過在地業者的堅持與創意，我們正共同譜寫一段屬於海岸的生活新篇章。
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {BUSINESSES.map((biz) => (
              <div key={biz.id} className="bg-white rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 hover:shadow-[0_30px_60px_rgba(0,0,0,0.1)] transition-all group">
                <div className="h-72 overflow-hidden relative">
                  <img src={biz.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={biz.name} />
                  <div className="absolute top-6 left-6 px-4 py-1.5 bg-primary/90 text-white text-xs font-bold rounded-full backdrop-blur-sm">
                    {biz.category}
                  </div>
                </div>
                <div className="p-10">
                  <h4 className="text-2xl font-bold mb-4 group-hover:text-accentOrange transition-colors">{biz.name}</h4>
                  <p className="text-gray-600 mb-8 leading-relaxed font-light">{biz.description}</p>
                  <button className="text-sm font-bold flex items-center gap-2 text-primary group-hover:gap-3 transition-all">
                    深度故事探索 <ChevronRight size={18} className="text-accentOrange" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section id="download" className="py-24 md:py-32 bg-gray-50 text-primary relative overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/5 rounded-full -mr-48 -mt-48 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accentYellow/5 rounded-full -ml-48 -mb-48 blur-3xl"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">計畫詳情與完整報告</h2>
            <p className="text-gray-500">透明公開的工程資訊，邀請您一同監督海岸的新生</p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {PROJECTS.map(p => (
              <div key={p.id} className="p-8 bg-white border border-gray-100 rounded-3xl hover:border-accentOrange transition-all shadow-sm hover:shadow-xl group">
                <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 text-gray-400 group-hover:bg-accentOrange/10 group-hover:text-accentOrange transition-colors">
                  <Download size={24} />
                </div>
                <h5 className="font-bold mb-2 text-lg">{p.title}</h5>
                <p className="text-xs text-gray-400 mb-6">PDF Document • 12.4 MB</p>
                <button className="w-full py-3 bg-gray-50 hover:bg-accentOrange hover:text-white rounded-xl flex items-center justify-center gap-2 text-sm font-bold transition-all shadow-inner">
                  立即下載報告
                </button>
              </div>
            ))}
          </div>
          
          <div className="mt-32 pt-16 border-t border-gray-200 text-gray-400 text-sm flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-4">
              <img src="https://i.meee.com.tw/f0soMtc.png" alt="Logo Footer" className="h-8 opacity-50 grayscale" />
              <p>© 2025 桃園市政府 珍珠海岸重生計畫</p>
            </div>
            <div className="flex gap-8 font-medium">
              <button onClick={() => scrollToSection('home')} className="hover:text-primary transition-colors">返回首頁</button>
              <a href="#" className="hover:text-primary transition-colors">隱私權保護政策</a>
              <a href="#" className="hover:text-primary transition-colors">聯絡我們</a>
            </div>
          </div>
        </div>
      </section>
      
      {/* Scroll to Top */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-8 right-8 z-[70] p-4 bg-accentOrange text-white rounded-full shadow-2xl transition-all transform hover:scale-110 active:scale-95 ${isScrolled ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
      >
        <ArrowDown className="rotate-180" size={24} />
      </button>
    </div>
  );
};

export default App;
