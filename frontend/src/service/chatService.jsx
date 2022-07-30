import { useDispatch } from 'react-redux';
import { chatSliceActions } from 'redux/slices/chatSlice';

const useGetAllChatsWithUser = async (_id) => {
    const dispatch = useDispatch();

    const getAllChatsWithUser = async () => {
        dispatch(chatSliceActions.getAllChatsWithUser(_id));
    };

    return getAllChatsWithUser;
};

export default useGetAllChatsWithUser;
