import React from 'react'

const Carts = () => {
  return (
    <section>
      <div className="cart">
        <div className="container">
          <h2>Carts</h2>
          <div className="product_cart">
            <table className='table'>
              <thead>
                <tr>
                  <th><input type="checkbox" name="" id="" /></th>
                  <th>id</th>
                  <th>img</th>
                  <th>name</th>
                  <th>price</th>
                  <th>quantity</th>
                  <th>total</th>
                  <th>action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><input type="checkbox" name="" id="" /></td>
                  <td>1</td>
                  <td><img src="./img/image 5.png" width={85} height={56} alt="" /></td>
                  <td>Product 1</td>
                  <td>1000</td>
                  <td>
                    <button>+</button>
                    <span className='sl'>1</span>
                    <button>-</button>
                  </td>
                  <td>1000</td>
                  <td>
                    <button className='btn btn-primary btn_edit'>EDIT</button>
                    <button className='btn btn-danger btn_delete'>DELETE</button>
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={8}>
                <button className='btn_submit'>SUBMIT ORDER</button>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>

    </section>
  )
}

export default Carts