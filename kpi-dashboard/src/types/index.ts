export interface FigmaData {
  teamName: string;
  filesCount: number;
  recentComments: number;
  designSystemUsage: number;
}

export interface ContentfulData {
  totalEntries: number;
  publishedEntries: number;
  draftEntries: number;
  recentAssetUploads: number;
}

export interface GithubData {
  repoName: string;
  openPRs: number;
  componentUsageCount: {
    componentName: string;
    count: number;
  }[];
}

export interface DashboardData {
  figma: FigmaData;
  contentful: ContentfulData;
  github: GithubData;
  lastUpdated: string;
}
