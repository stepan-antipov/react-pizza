import React from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { setSort, setOrder } from '../redux/slices/filterSlice';


const filters = [
  {name: 'популярности', sortProperty: 'rating'}, 
  {name: 'цене', sortProperty: 'price'}, 
  {name: 'алфавиту', sortProperty: 'title'}
];

function Sort() {

  const {sort, orderType } = useSelector(state => state.filter);
  const dispatch = useDispatch();

  const sortRef = React.useRef();

  const [popUpOpen, setPopUpOpen] = React.useState(false);

  const onPopUp = (obj) => {
    dispatch(setSort(obj))
    setPopUpOpen(!popUpOpen);
  }

  const onClickArrow = (bool) => {
    dispatch(setOrder(bool));
  }

  React.useEffect(() => {
    const handleClickOutside = (event) => {
    if (!event.composedPath().includes(sortRef.current)) {
      setPopUpOpen(false);
    }}
    
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
    }, [])
  

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <b>Сортировка по:</b>
        <span onClick={() => setPopUpOpen(!popUpOpen)}>{sort.name}</span>
        <button onClick={() => onClickArrow(false)} className={orderType ? '' : 'button__big-arrow'}>
          <svg width="12" height="18" viewBox="0 0 12 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_102_8)">
          <path d="M4.1719 0.00984441C4.03409 0.0435944 3.93097 0.0998444 3.82972 0.199688C3.63284 0.390938 3.50815 0.667969 3.46315 1.00969C3.4519 1.09828 3.45003 1.62703 3.45003 4.59281V8.07188H2.10753C1.2394 8.07188 0.742529 8.0775 0.703154 8.08594C0.382529 8.16188 0.129404 8.49938 0.0309668 8.98172C0.0084668 9.09281 0.0065918 9.12797 0.0065918 9.31641C0.0065918 9.50484 0.0084668 9.54 0.0309668 9.65109C0.0712793 9.84656 0.135967 10.0209 0.222217 10.1616C0.241904 10.1939 1.14378 11.4947 2.22659 13.0514C3.3094 14.6081 4.48128 16.2942 4.83097 16.7977C5.50784 17.7708 5.55284 17.8298 5.69815 17.9142C5.95128 18.0605 6.23534 18.0141 6.45565 17.7905C6.51565 17.73 6.99659 17.0466 8.53315 14.8345C9.63284 13.2525 10.8094 11.5594 11.1469 11.0742C11.4844 10.5877 11.776 10.1644 11.7947 10.1334C11.8725 9.99844 11.9307 9.83953 11.9691 9.65109C11.9916 9.54 11.9935 9.50484 11.9935 9.31641C11.9935 9.12797 11.9916 9.09281 11.9691 8.98172C11.8707 8.49938 11.6175 8.16188 11.2969 8.08594C11.2575 8.0775 10.7607 8.07188 9.89347 8.07188H8.55003L8.54815 4.53797L8.54534 1.00547L8.51909 0.885938C8.43472 0.506251 8.25753 0.220782 8.02315 0.0843757C7.87128 -0.00421809 7.96597 6.58101e-07 5.99159 0.00140691C5.00347 0.00281316 4.18503 0.00703191 4.1719 0.00984441Z" fill="#FF5722"/>
          </g>
          <defs>
          <clipPath id="clip0_102_8">
          <rect width="12" height="18" fill="white"/>
          </clipPath>
          </defs>
          </svg>
        </button>
        <button onClick={() => onClickArrow(true)} className={orderType ? 'button__big-arrow' : ''}>
          <svg width="12" height="18" viewBox="0 0 12 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_102_11)">
          <path d="M7.82797 17.9897C7.96579 17.956 8.06891 17.8997 8.17016 17.7999C8.36704 17.6086 8.49172 17.3316 8.53672 16.9899C8.54797 16.9013 8.54985 16.3725 8.54985 13.4068V9.9277H9.89235C10.7605 9.9277 11.2573 9.92207 11.2967 9.91363C11.6173 9.8377 11.8705 9.5002 11.9689 9.01785C11.9914 8.90676 11.9933 8.8716 11.9933 8.68316C11.9933 8.49473 11.9914 8.45957 11.9689 8.34848C11.9286 8.15301 11.8639 7.97863 11.7777 7.83801C11.758 7.80566 10.8561 6.50488 9.77329 4.94817C8.69047 3.39145 7.5186 1.70535 7.16891 1.20192C6.49204 0.22879 6.44704 0.169728 6.30172 0.0853529C6.0486 -0.0608971 5.76454 -0.0144908 5.54422 0.209103C5.48422 0.269572 5.00329 0.953009 3.46672 3.16504C2.36704 4.74707 1.19047 6.4402 0.852975 6.92535C0.515475 7.41191 0.223912 7.8352 0.205162 7.86613C0.12735 8.00113 0.0692246 8.16004 0.0307871 8.34848C0.00828712 8.45957 0.00641212 8.49473 0.00641212 8.68316C0.00641212 8.8716 0.00828712 8.90676 0.0307871 9.01785C0.129225 9.5002 0.38235 9.8377 0.702975 9.91363C0.74235 9.92207 1.23922 9.9277 2.10641 9.9277H3.44985L3.45172 13.4616L3.45454 16.9941L3.48079 17.1136C3.56516 17.4933 3.74235 17.7788 3.97672 17.9152C4.1286 18.0038 4.03391 17.9996 6.00829 17.9982C6.99641 17.9968 7.81485 17.9925 7.82797 17.9897Z" fill="#FF5722"/>
          </g>
          <defs>
          <clipPath id="clip0_102_11">
          <rect width="12" height="18" fill="white" transform="matrix(-1 0 0 -1 11.9999 17.9996)"/>
          </clipPath>
          </defs>
          </svg>
        </button>


      </div>
    { popUpOpen && (
      <div className="sort__popup">
        <ul>
          {
            filters.map((obj) => {
              return (
                <li 
                key={obj.name} 
                onClick={() => onPopUp(obj)} 
                className={sort.sortProperty === obj.sortProperty ? 'active' : ''}>
                  {obj.name}
                </li>
              )
            })
          }
        </ul>
      </div>
      )}
    </div>
  )
}

export default Sort;