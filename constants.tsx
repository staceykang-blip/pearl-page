
import { ProjectData, BusinessStory } from './types';

export const PROJECTS: ProjectData[] = [
  {
    id: 'zhuwei',
    title: '竹圍濱海園區',
    subtitle: '南岸遊憩核心的華麗轉身',
    origin: '針對南北岸發展不均及遊憩設施老舊問題，重新規劃漁會大樓西南側閒置空間，致力於打造桃園北端最具活力的濱海核心。',
    design: '以漁會大樓為地標，強化周邊服務系統。導入親子友善設計，包含大型滑沙體驗場、多功能活動草坪，並優化夜間照明系統，營造安全舒適的臨海休憩空間。',
    progress: '目前第一期基地整地工程已接近完成，綠美化草皮與人行道鋪設正同步進行中。',
    expected: '預計將成為可容納 2.5 萬人的大型活動場域。未來將定期舉辦海洋市集、夏日音樂節與親子工作坊，結合當地海鮮特色餐廳，將竹圍漁港從傳統魚市轉型為具備四季吸引力的國際級休閒漁港區。',
    budget: '',
    image: 'https://i.meee.com.tw/54HBURy.jpg'
  },
  {
    id: 'yongan',
    title: '永安海客文化園區',
    subtitle: '千年石滬與海客精神的共振',
    origin: '為了保存獨特的海洋客家文化，並解決永安漁港假日停車空間不足與人車爭道之現狀，啟動整體景觀優化計畫。',
    design: '以「里海」永續理念出發，建築設計融合海浪律動感。新建半室外觀浪平台，讓訪客能近距離感受潮汐變幻，並透過數位裝置導覽石滬文化。',
    progress: '細部設計已全面定案，現正執行停車場排水效能提升與既有構造物移除工程。',
    expected: '目標是深化海洋客家文化的國際能見度。結合海螺館，這裡將成為全台唯一的客家海洋教育基地，不僅提供優質的觀景服務，更將透過常態性的文化季活動，讓訪客深度體驗「牽罟」與「石滬」的先民智慧。',
    budget: '',
    image: 'https://i.meee.com.tw/0ujszEB.png'
  },
  {
    id: 'xinwu',
    title: '新屋綠色隧道',
    subtitle: '漫活海岸線的綠意延伸',
    origin: '致力於優化北台灣最受歡迎的自行車廊道，串聯至新竹雙新自行車道，打造跨縣市的綠色觀光軸線。',
    design: '強化「慢活」體驗，優化沿線照明與休憩設施。針對觀海亭進行結構修繕並提升美感，同時在漂流木公園導入地景藝術，將牽罟文化的意象融入地標建築。',
    progress: '工程進度持續推進，目前已啟動觀海亭基礎補強與眺望平台的景觀營造作業。',
    expected: '預計大幅提升自行車慢遊的舒適度。除了完善的軟硬體設施外，更將結合生態解說系統，讓訪客在享受綠意與海風的同時，也能學習海岸林的防風功能與生態價值，建立人與自然和諧共存的典範。',
    budget: '',
    image: 'https://i.meee.com.tw/LzVvJq8.png'
  },
  {
    id: 'connection',
    title: '濱海珍珠串聯',
    subtitle: '點點珍珠織就的璀璨海岸',
    origin: '為解決各遊憩點散落、缺乏整體感的現況，透過珍珠串聯計畫將桃園海岸線縫合，優化交通動線。',
    design: '採「人車分離、景觀優先」原則，規劃專屬的步行與自行車導引系統。增設 110 格小客車位減緩交通壓力，並於軸線節點設置多功能展演節點。',
    progress: '施工進度順利，已陸續完成工區整地、排水設施及主要景觀邊界之緣石鋪設。',
    expected: '將打造出一條長達 20 公里的友善海岸廊道。透過統一的視覺識別（CIS）與智慧導覽服務，讓原本零星的觀光點轉化為帶狀的旅遊經濟圈，為當地社區注入青年返鄉創業的新動力，實現桃園海岸的華麗變身。',
    budget: '',
    image: 'https://i.meee.com.tw/ojWU8mu.jpg'
  }
];

export const BUSINESSES: BusinessStory[] = [
  {
    id: 'b1',
    category: '美食',
    name: '海客慢食基地',
    description: '傳承百年的客家醃漬技藝，與當季海產交織出的獨特風味。',
    image: 'https://images.unsplash.com/photo-1555126634-323283e090fa?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'b2',
    category: '伴手禮',
    name: '珍珠手工皂坊',
    description: '使用萃取自桃園海岸的自然元素與天然精油，將海的味道與純淨的療癒力帶回家。',
    image: 'https://images.unsplash.com/photo-1607006344380-b6775a0824a7?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'b3',
    category: '旅宿',
    name: '觀浪之森民宿',
    description: '在松林與海浪聲中醒來，體驗最純粹的濱海慢活人生。',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=600&auto=format&fit=crop'
  }
];
