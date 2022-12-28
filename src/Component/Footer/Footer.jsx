import React from 'react'

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer_top">
                <div className=" container">
                    <div className="row">
                        <div className="col-lg-4 col-md-6">
                            <div className="bd_right">
                                <h4>GET HELP</h4>
                                <ul>
                                    <li><a href="#">Home</a></li>
                                    <li><a href="#">Nike</a></li>
                                    <li><a href="#">Adidas</a></li>
                                    <li><a href="#">Contact</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="bd_right">
                                <h4>SUPPORT</h4>
                                <ul>
                                    <li><a href="#">About</a></li>
                                    <li><a href="#">Contact</a></li>
                                    <li><a href="#">Help</a></li>
                                    <li><a href="#">Phone</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="b">
                                <h4>REGISTER</h4>
                                <ul>
                                    <li><a href="#">Register</a></li>
                                    <li><a href="#">Login</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer_design">
                <p>© 2022 Cybersoft All Rights Reserved | Design Theme by Trương Tấn Khải.
                </p>
            </div>
        </footer>

    )
}

export default Footer