import { useEffect, useState } from 'react';
import { DATA_URL } from '../config/ranklist';
import { RankUser } from '../types';
import { normalizeRankUsers } from '../utils/ranklistData';

interface RanklistDataState {
  users: RankUser[];
  lastUpdateTime: string;
  isLoading: boolean;
  error: string | null;
}

function formatUpdateTime(lastModified: string | null): string {
  const date = lastModified ? new Date(lastModified) : new Date();

  return date.toLocaleString('zh-CN', {
    timeZone: 'Asia/Shanghai',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function useRanklistData(dataUrl = DATA_URL): RanklistDataState {
  const [state, setState] = useState<RanklistDataState>({
    users: [],
    lastUpdateTime: '加载中...',
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      try {
        const response = await fetch(dataUrl);
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
        }

        const payload = await response.json();
        const users = normalizeRankUsers(payload);
        const lastUpdateTime = formatUpdateTime(response.headers.get('last-modified'));

        if (!isMounted) return;

        setState({
          users,
          lastUpdateTime,
          isLoading: false,
          error: null,
        });
      } catch (error) {
        console.error('Error fetching ranklist data:', error);

        if (!isMounted) return;

        setState({
          users: [],
          lastUpdateTime: '加载失败',
          isLoading: false,
          error: '数据获取失败',
        });
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [dataUrl]);

  return state;
}
