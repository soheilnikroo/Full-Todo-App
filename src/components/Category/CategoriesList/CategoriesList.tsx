import React, { Fragment } from 'react';
import Category from '../Category';

// import css
import classes from './style/CategoriesList.module.css';

interface CategoriesListProps {
  onClick: (categoryName: string) => void;
  doneLength: number;
  taskLength: number;
  loading: boolean;
}

const CategoriesList: React.FC<CategoriesListProps> = ({
  onClick,
  doneLength,
  taskLength,
  loading,
}) => (
  <div className={classes['category-list']}>
    <Category
      color="#887ff5"
      onClick={() => onClick('todo')}
      title="Todo's"
      amount={taskLength}
      percentage={taskLength / (taskLength + doneLength)}
    />
    <Category
      color="#66BAA7"
      onClick={() => onClick('done')}
      title="Done"
      amount={doneLength}
      percentage={doneLength / (taskLength + doneLength)}
    />
  </div>
);

export default CategoriesList;
