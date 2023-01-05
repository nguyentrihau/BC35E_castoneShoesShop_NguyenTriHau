import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProductFavoriteApi, handleFavorite, likeApi, unlikeApi } from '../../redux/reducers/userReducer';
import { getToken } from '../../util/config';
import { history } from '../../App';
const Products = (props) => {
    const { prod } = props;
    const { valid } = props;
    // console.log(valid);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [bgHeart, setBgHeart] = useState("fa-regular fa-heart");
    const [like, setLike] = useState(true);
    const [idProductHeart, setIdProductHeart] = useState(prod.id);
    useEffect(() => {
        if (valid) { setBgHeart("fa fa-heart") };
    }, [valid])
    return (
        <div className="card">
            <img src={prod?.image} className="card-img-top" alt="..." />
            <div className='product_heart'>
                <i className={bgHeart} style={{ cursor: 'pointer' }} onClick={() => {
                    if (like) {
                        if (!getToken()) { return history.push('/login') };
                        setIdProductHeart(prod?.id);
                        dispatch(likeApi(idProductHeart));
                        setBgHeart("fa fa-heart"); 
                        return setLike(false);
                    } else if (!like) {
                        setIdProductHeart(prod?.id);
                        dispatch(unlikeApi(idProductHeart));
                        setBgHeart("fa-regular fa-heart"); 
                        return setLike(true);
                    }
                }}></i>
            </div>
            <div className="card-body">
                <h5 className="card-title">{prod?.name?.length > 20 ? prod?.name?.substr(0, 20) + '...' : prod?.name}</h5>
                {/* <p className="card-text">{prod?.shortDescription}</p> */}
                <p className="card-text">{prod?.shortDescription?.length > 55 ? prod?.shortDescription?.substr(0, 55) + '...' : prod?.shortDescription}</p>
            </div>
            <div className="card-footer py-0 px-0 d-flex ">
                <button className="left" onClick={() => {
                    navigate(`/detail/${prod.id}`);
                    document.documentElement.scrollTop = 0;
                }}>
                    <NavLink to={`/detail/${prod?.id}`}>Buy now</NavLink>
                </button>
                <div className="right">
                    <p>{prod?.price}$</p>
                </div>
            </div>
        </div>

    )
}

export default Products