import { useState, useEffect, useImperativeHandle } from 'react';
import { View } from '@tarojs/components';
import { InfiniteLoading, Empty } from '@nutui/nutui-react-taro';
import './index.scss';

/**
 * @description 无限加载列表
 * @param itemRender 自定义渲染
 * @param getListData 获取数据方法
 * @param queryParams 查询参数
 * @param onRef 获取ref
 */

interface InfiniteListProps {
  itemRender: (item: any, index: number) => JSX.Element;
  getListData: (params: any) => Promise<any>;
  queryParams?: any;
  onRef?: any;
}
export default function InfiniteList({ itemRender, getListData, queryParams, onRef }: InfiniteListProps) {
  const [current, setCurrent] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [defaultList, setDefaultList] = useState<any[]>([]);
  useImperativeHandle(onRef, () => ({
    refresh: init,
  }));
  useEffect(() => {
    init();
  }, [queryParams]);
  function init() {
    setCurrent(1);
    setHasMore(true);
    setDefaultList([]);
  }
  useEffect(() => {
    defaultList.length == 0 && getData(current);
  }, [defaultList]);

  async function getData(_current) {
    if (!hasMore) return;
    const param = { ...queryParams, size: 10, current: _current };
    const res: any = await getListData(param);
    setDefaultList([...defaultList, ...res.data.records]);
    setHasMore(res.data.total > defaultList.length + res.data.records.length);
  }
  const loadMore = async (done) => {
    const _current = current + 1;
    setCurrent(_current);
    await getData(_current);
    done();
  };

  const onRefresh = async (done) => {
    setCurrent(1);
    setHasMore(true);
    setDefaultList([]);
    done();
  };

  return (
    <View id='scrollDemo' className='scroll-list'>
      {defaultList.length > 0 ? (
        <InfiniteLoading pullRefresh={false} target='scrollDemo' threshold={100} hasMore={hasMore} onLoadMore={loadMore} onRefresh={onRefresh}>
          {defaultList.map(itemRender)}
        </InfiniteLoading>
      ) : (
        <Empty description='无数据' />
      )}
    </View>
  );
}
