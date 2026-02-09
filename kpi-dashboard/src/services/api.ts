import { DashboardData } from '../types';

export const fetchDashboardData = async (): Promise<DashboardData> => {
  // Simuliert API Delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  return {
    figma: {
      teamName: "Marketing Design",
      filesCount: 42,
      recentComments: 12,
      designSystemUsage: 78,
    },
    contentful: {
      totalEntries: 1250,
      publishedEntries: 1100,
      draftEntries: 150,
      recentAssetUploads: 5,
    },
    github: {
      repoName: "frontend-monorepo",
      openPRs: 3,
      componentUsageCount: [
        { componentName: "<Button />", count: 342 },
        { componentName: "<Card />", count: 120 },
        { componentName: "<Hero />", count: 45 },
      ],
    },
    lastUpdated: new Date().toLocaleTimeString(),
  };
};
