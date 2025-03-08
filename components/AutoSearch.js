'use client'
import axios from 'axios';
import { Cookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import useSWR from 'swr';
import { API_URL } from '../constants/api';
import { getFavourite, searchAction } from '../store/actions/customer_actions';
import { setAuthModal } from '../store/reducers/auth_reducer';
import {
  setProductDetails,
  setSearchItems,
} from '../store/reducers/main_reducer';
import LikeIIcon from './utils/icons/LikeIIcon';
import LikedIcon from './utils/icons/LikedIcon';

const fetcher = async (url, authDetails) => {
  const res = await axios.get(url, authDetails);
  return res.data;
};

const AutoSearch = () => {
  const dispatch = useDispatch();
  const cookies = new Cookies();
  const user = cookies.get('user');
  const token = cookies.get('token');
  const searchItems = useSelector((state) => state.main.searchItems);

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const favouriteUrl = `${API_URL}/favourite`;
  const { data: favourites } = useSWR(favouriteUrl, (url) =>
    fetcher(url, config)
  );

  const handleOnSearch = async (string) => {
    try {
      const results = await searchAction(string);
      dispatch(setSearchItems(results?.data));
    } catch (err) {
      return err;
    }
  };

  const formatResult = (item) => {
    const checkFavorite = getFavourite(favourites, item?.slug, user?.pk);

    return (
      <div className="flex items-center justify-between my-1">
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="h-10 w-10 overflow-hidden">
            <img src={`${item?.image.src}`} alt="onics" />
          </div>
          <span className="block text-left capitalize text-[#0000009e] md:text-lg">
            {item.name}
          </span>
        </div>

        <div className="mr-3 cursor-pointer">
          {checkFavorite ? <LikedIcon /> : <LikeIIcon />}
        </div>
      </div>
    );
  };

  return (
    <div style={{ width: 400 }}>
      <ReactSearchAutocomplete
        items={searchItems}
        onSearch={handleOnSearch}
        onSelect={(item) => {
          dispatch(setProductDetails(item));
          dispatch(setAuthModal('PRODUCT_DETAILS'));
        }}
        autoFocus={false}
        placeholder={'Search products'}
        styling={{
          border: '2px solid #fbbf24',
          borderRadius: '10px',
          cursor: 'pointer',
        }}
        formatResult={formatResult}
      />
    </div>
  );
};

export default AutoSearch;
