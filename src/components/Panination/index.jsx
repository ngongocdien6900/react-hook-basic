import React from 'react';
import PropTypes from 'prop-types';

Pagination.propTypes = {
    pagination: PropTypes.object.isRequired, 
    onPageChange: PropTypes.func,
};

Pagination.defaultProps = {
    onPageChange: null,
}

function Pagination(props) {

    function handlePageChange(newPage) {
        //kiểm tra xem cha nó truyền onPageChange xuống không
        if(onPageChange) {
            //nếu có thì truyền page mới lên cho cha
            onPageChange(newPage)
        }
    }

    const {pagination, onPageChange} = props; 
    //từ api trả về
    const {_page, _limit, _totalRows} = pagination;
    const pageEnd = Math.ceil(_totalRows / _limit); 
    return (
        <div>
            <button
                disabled={_page <= 1}
                onClick={() => handlePageChange(_page - 1)}
            >
                Previous    
            </button>

            <button
                disabled={_page >= pageEnd}
                onClick={() => handlePageChange(_page + 1)}
            >
                Next    
            </button>
        </div>
    );
}

export default Pagination;