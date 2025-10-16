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

const ALPHABETICALLY = 'alpha';
const LENGTH = 'length';
const RESET = '';

function sortGoods(list, sortType) {
  const listCopy = [...list];

  listCopy.sort((good1, good2) => {
    switch (sortType) {
      case ALPHABETICALLY:
        return good1.localeCompare(good2);

      case LENGTH:
        return good1.length - good2.length;

      default:
        return 0;
    }
  });

  if (sortType === RESET) {
    return [...goodsFromServer];
  }

  return [...listCopy];
}

export const App = () => {
  const [sortType, setSortType] = useState('');
  const [reversed, setReversed] = useState(false);
  let sortedList = [...goodsFromServer];

  if (sortType) {
    sortedList = sortGoods(goodsFromServer, sortType);
  }

  if (reversed) {
    sortedList.reverse();
  }

  if (!sortType && !reversed) {
    sortedList = [...goodsFromServer];
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortType !== ALPHABETICALLY,
          })}
          onClick={() => setSortType(ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortType !== LENGTH,
          })}
          onClick={() => setSortType(LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !reversed,
          })}
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>

        {sortType || reversed ? (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortType(RESET);
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
          <li data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
