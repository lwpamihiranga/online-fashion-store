import React from "react";

class App extends React.Component
{
    constructor(props) {
        super(props);

        this.state = ({wishList: [],isNeedToRefresh : true});
    }

    render() {

        //user login informations
        var name = localStorage.getItem('userName');
        var password = localStorage.getItem('userPassword');
        var type = localStorage.getItem('userType');
        var userid = localStorage.getItem('userId');
        var imageLink = localStorage.getItem('userImageLink');
        var email = localStorage.getItem('userEmail');

        this.getWishListFromServer(userid);

        const wishList = this.state.wishList.map(wish => {

            return(
                <div className="wishListItem">

                </div>
            )
        });
        return(
            <div className="wishListContainer">
                {wishList}
            </div>
        )
    }
    getWishListFromServer = (userId) => {

    }
}
export default App;