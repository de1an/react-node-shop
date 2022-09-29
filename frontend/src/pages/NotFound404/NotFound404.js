import React from 'react';

function NotFound404() {
  return (
    <div className="d-flex align-items-center justify-content-center mt-5">
        <div className="text-center">
            <h1 className="display-1 fw-bold">404</h1>
            <p className="fs-3"> <span className="text-danger">Opps!</span> Page not found.</p>
            <p className="lead mb-3">
                The page you’re looking for doesn’t exist.
              </p>
            <a href="/shop" className="btn btn-primary">Go to Shop</a>
        </div>
    </div>
  )
}

export default NotFound404;