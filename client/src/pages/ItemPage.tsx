import { useParams } from 'react-router-dom';

export const ItemPage = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <h1>Детальная информация об объявлении</h1>
      <p>ID объявления: {id}</p>
      <p>Здесь будет детальная информация об объявлении</p>
    </div>
  );
};
