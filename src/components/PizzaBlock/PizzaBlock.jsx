import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { addItem } from '../../redux/slices/cartSlice';

function PizzaBlock({ id, title, price, imageUrl, sizes, types }) {
  // const { items } = useSelector((state) => state.cart)
  const dispatch = useDispatch();
  const cartItem = useSelector((state) => state.cart.items.find((obj) => obj.id === id));
  const addedCount = cartItem ? cartItem.count : 0;

  const [activeSize, setActiveSize] = React.useState(0);
  const [activeType, setActiveType] = React.useState(0);

  const testType = ['тонкое', 'традиционное'];

  const onAdd = () => {
    const item = {
      id,
      title,
      price,
      imageUrl,
      type: testType[activeType],
      size: sizes[activeSize],
    };
    dispatch(addItem(item));
  };

  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
        <div className="pizza-block__right">
          <h4 className="pizza-block__title">{title}</h4>
          <div className="pizza-block__selector">
            <ul>
              {types.map((elem, i) => {
                return (
                  <li
                    key={elem}
                    onClick={() => setActiveType(i)}
                    className={activeType === i ? 'active' : ''}>
                    {testType[elem]}
                  </li>
                );
              })}
            </ul>
            <ul>
              {sizes.map((elem, i) => {
                return (
                  <li
                    key={elem}
                    onClick={() => setActiveSize(i)}
                    className={activeSize === i ? 'active' : ''}>
                    {elem} см.
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="pizza-block__bottom">
            <div className="pizza-block__price">от {price} ₽</div>
            <button onClick={() => onAdd()} className="button button--outline button--add">
              <span>Добавить</span>
              {addedCount > 0 && <i>{addedCount}</i>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PizzaBlock;
