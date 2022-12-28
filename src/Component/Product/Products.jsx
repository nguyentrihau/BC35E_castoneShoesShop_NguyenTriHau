import React from 'react'
import { NavLink,useNavigate } from 'react-router-dom';

const Products = (props) => {
    const { prod } = props;
    const navigate =useNavigate();
    return (
        <div className="card">
            <img src={prod?.image} className="card-img-top" alt="..." />
            <div className='product_heart'><i className="fa fa-heart" aria-hidden="true"></i></div>
            <div className="card-body">
                <h5 className="card-title">{prod?.name}</h5>
                <p className="card-text">{prod?.shortDescription}</p>
                {/* <p className="card-text">{prod.shortDescription.length > 45 ? prod.shortDescription.substr(0,45)+'...':prod.shortDescription}</p> */}
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