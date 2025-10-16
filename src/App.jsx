import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import cn from 'classnames';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

const handleSortAlphabetically = 'alpha';
const handleSortByLength = 'length';
const resetOrder = '';

function sortGoods(list, sortType) {
  const listCopy = [...list];

  listCopy.sort((good1, good2) => {
    switch (sortType) {
      case handleSortAlphabetically:
        return good1.localeCompare(good2);

      case handleSortByLength:
        return good1.length - good2.length;

      default:
        return 0;
    }
  });

  if (sortType === resetOrder) {
    return [...goodsFromServer];
  }

  return [...listCopy];
}

export const App = () => {
  const [sortType, setSortType] = useState('');
  const [toggleReverse, setReversed] = useState(false);
  let initialState;
  let sortedList = [...goodsFromServer];

  if (sortType) {
    sortedList = sortGoods(goodsFromServer, sortType);
  }

  if (toggleReverse) {
    sortedList.reverse();
  }

  if (!sortType && !toggleReverse) {
    initialState = true;
    sortedList = [...goodsFromServer];
  } else {
    initialState = false;
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortType !== handleSortAlphabetically,
          })}
          onClick={() => setSortType(handleSortAlphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortType !== handleSortByLength,
          })}
          onClick={() => setSortType(handleSortByLength)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !toggleReverse,
          })}
          onClick={() => setReversed(!toggleReverse)}
        >
          Reverse
        </button>

        {!initialState ? (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortType(resetOrder);
              setReversed(false);
            }}
          >
            Reset
          </button>
        ) : (
          ''
        )}
      </div>

      <ul>
        {sortedList.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
