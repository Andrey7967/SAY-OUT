import { FixedSizeList as List } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import { useState, useRef } from 'react';
import axios from 'axios';

interface messageQuery {
  author: string;
  content: string;
}
export default function InfiniteList() {
  const [items, setItems] = useState<Array<messageQuery>>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const pageRef = useRef(1);

  const loadMoreItems = async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      const response = await axios.get(
        `https://api.example.com/items?page=${pageRef.current}`
      );

      setItems((prev) => [...prev, ...response.data]);
      pageRef.current += 1;
      setHasMore(response.data.length > 0);
    } catch (error) {
      console.error('Ошибка:', error);
    } finally {
      setLoading(false);
    }
  };

  const isItemLoaded = (index) => index < items.length;

  const Row = ({ index, style }) => (
    <div style={style}>
      {isItemLoaded(index) ? items[index].author : 'Загрузка...'}
    </div>
  );

  return (
    <div className="your-existing-container">
      {' '}
      {}
      <InfiniteLoader
        isItemLoaded={isItemLoaded}
        itemCount={hasMore ? items.length + 1 : items.length}
        loadMoreItems={loadMoreItems}
      >
        {({ onItemsRendered, ref }) => (
          <List
            height="100%"
            width="100%"
            itemCount={hasMore ? items.length + 1 : items.length}
            itemSize={50}
            onItemsRendered={onItemsRendered}
            ref={ref}
          >
            {Row}
          </List>
        )}
      </InfiniteLoader>
    </div>
  );
}
