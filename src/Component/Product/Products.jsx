import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { likeApi, unlikeApi } from '../../redux/reducers/userReducer';
const Products = (props) => {
    const { prod } = props;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [bgHeart, setBgHeart] = useState("fa-regular fa-heart");
    const [like, setLike] = useState(true);
    const [idProductHeart,setIdProductHeart] = useState('');
    console.log("true",idProductHeart);
    
    return (
        <div className="card">
            <img src={prod?.image} className="card-img-top" alt="..." />
            <div className='product_heart'>
                <i className={bgHeart} style={{ cursor: 'pointer' }} onClick={() => {
                    if (like) {
                        setBgHeart("fa fa-heart"); setLike(false);
                        setIdProductHeart(prod?.id);
                        dispatch(likeApi(idProductHeart));
                    } else {
                        setBgHeart("fa-regular fa-heart"); setLike(true);
                        dispatch(unlikeApi(idProductHeart));
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