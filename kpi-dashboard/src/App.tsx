import React, { useEffect, useState } from 'react';
import { fetchDashboardData } from './services/api';
import { DashboardData } from './types';
import { KpiCard } from './components/KpiCard';
import { ProgressBar } from './components/ProgressBar';
import { Layout, FileImage, GitPullRequest, Database } from 'lucide-react';

const App: React.FC = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await fetchDashboardData();
        setData(result);
      } catch (error) {
        console.error("Error while loading dashboard data", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-50">
      <div className="animate-pulse flex flex-col items-center">
        <div className="h-12 w-12 bg-blue-500 rounded-full mb-4"></div>
        <div className="text-gray-400 font-medium">Loading brix/react Dashboard...</div>
      </div>
    </div>
  );

  if (!data) return <div>Unfortunately there is no data available at the moment.</div>;

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10 flex flex-col md:flex-row justify-between md:items-end gap-4">
          <div>
            <div className="flex items-center gap-2 text-blue-600 mb-1">
              <Layout size={20} />
              <span className="font-bold uppercase tracking-wider text-xs">brix/react Dashboard</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Design System Metrics</h1>
            <p className="text-slate-500 mt-2">Real-time Metrics from Figma, Github and Contentful.</p>
          </div>
          <div className="text-xs font-mono bg-white px-3 py-1 rounded border border-slate-200 text-slate-400">
            Last update: {data.lastUpdated}
          </div>
        </header>

        {/* GRID LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* 1. FIGMA */}
          <KpiCard title="Design" icon={<FileImage size={24} />} sourceColor="border-purple-500">
             <div className="flex items-baseline justify-between mb-2">
               <span className="text-slate-600 text-sm">Figma Files with Components in use</span>
               <span className="text-4xl font-extrabold text-purple-600">{data.figma.filesCount}</span>
             </div>
             <div className="h-px bg-slate-100 my-4"></div>
             <ProgressBar 
               label="Design System Coverage in %" 
               value={data.figma.designSystemUsage} 
               max={100} 
               color="bg-purple-500" 
             />
             <div className="mt-6 flex items-center gap-2 text-xs text-purple-700 bg-purple-50 p-3 rounded border border-purple-100">
               <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></div>
               {data.figma.recentComments} Comments in Review
             </div>
          </KpiCard>

          {/* 2. GITHUB / REACT COMPONENTS */}
          <KpiCard title="Code" icon={<GitPullRequest size={24} />} sourceColor="border-slate-800">
            <div className="flex items-center justify-between mb-6 bg-slate-50 p-3 rounded border border-slate-100">
               <span className="text-slate-600 text-sm font-medium">Open Pull Requests</span>
               <span className="px-2.5 py-0.5 bg-green-100 text-green-700 rounded text-xs font-bold border border-green-200">
                 {data.github.openPRs} Active
               </span>
            </div>
            
            <h4 className="text-xs font-bold text-slate-400 uppercase mb-3 tracking-wider">Top Components in React</h4>
            <ul className="space-y-4">
              {data.github.componentUsageCount.map((comp) => (
                <li key={comp.componentName}>
                   <ProgressBar 
                     label={comp.componentName} 
                     value={comp.count} 
                     max={500} 
                     color="bg-slate-800" 
                   />
                </li>
              ))}
            </ul>
          </KpiCard>

          {/* 3. CONTENTFUL */}
          <KpiCard title="Content" icon={<Database size={24} />} sourceColor="border-blue-500">
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-100">
                <div className="text-2xl font-bold text-blue-600">{data.contentful.publishedEntries}</div>
                <div className="text-[10px] text-blue-400 uppercase font-bold tracking-wider mt-1">Published</div>
              </div>
              <div className="text-center p-3 bg-orange-50 rounded-lg border border-orange-100">
                <div className="text-2xl font-bold text-orange-500">{data.contentful.draftEntries}</div>
                <div className="text-[10px] text-orange-400 uppercase font-bold tracking-wider mt-1">Drafts</div>
              </div>
            </div>
            <ProgressBar 
               label="Total Enabled Components in Contentful" 
               value={data.contentful.totalEntries} 
               max={2000} 
               color="bg-blue-500" 
             />
          </KpiCard>

        </div>
      </div>
    </div>
  );
};

export default App;