import React from 'react'
import filledStar from '../../images/filled_rating.png';
import unfilledStar from '../../images/unfilled_rating.png';
import css from '../../css/rateList.css';
import axios from "axios";
import {Link} from "react-router-dom";

class App extends React.Component
{
    constructor(props) {
        super(props);

        this.state = ({
           ratingList : [],
            isFirstTime : true,
            starSize : [1,2,3,4,5],
            selectedStarCount : 1
        });

        this.handleStarOnClick = this.handleStarOnClick.bind();
    }
    render() {

        const productId = this.props.productId;
        if(this.state.isFirstTime)
        {
            this.getRatingsByProductId(productId);
        }


        const list = this.state.ratingList.map(rating => {

            let comment = rating.comment;
            const rate = this.state.starSize.map(i => {
                return(
                    <div>
                        {rating.rate >= i &&
                            <img className="star" src={filledStar}/>
                        }
                        {rating.rate < i &&
                        <img className="star" src={unfilledStar}/>
                        }
                    </div>
                )
            });

            return(
                <div  className="rateItemContainer">
                    <div className="rateItem">
                        {rate}
                    </div>
                    <div>
                        <h3 id="rateName">{comment}</h3>
                    </div>
                </div>
            )

        });

        const userInputRatings = this.state.starSize.map(i => {

            return(
                <div className="input" key={i}>
                    {i <= this.state.selectedStarCount &&
                    <img className="inputstarActive" src={filledStar}  onClick={ () => this.setState({selectedStarCount : i})}/>
                    }
                    {i > this.state.selectedStarCount &&
                    <img className="inputstarInactive" src={unfilledStar}   onClick={ () => this.setState({selectedStarCount : i})}/>
                    }
                </div>
            )


        });

        return(


            <div className="ratingContainer">
                <div className="userInputRating">
                    <div className="rateItem">
                        {userInputRatings}
                    </div>
                    <input type="text"/>
                </div>
                <h3>Comments</h3>
                <div className="ratingList">
                    {list}
                </div>
            </div>

        )
    }
    getRatingsByProductId(id)
    {
        //loading products according to the id and store in states
        axios.get("http://localhost:5000/api/ratings/findByProductId?productId=" + id)
            .then(response => {
                if(response.status === 200)
                {
                    if(this.state.isFirstTime)
                    {
                        var list = response.data;
                        this.setState({ratingList :list, isFirstTime : false,starSize : [1,2,3,4,5],selectedStarCount : 1});
                    }

                }
            })
            .catch(error => console.log(error));
    }
    handleStarOnClick(count)
    {

    }

}
export default App;