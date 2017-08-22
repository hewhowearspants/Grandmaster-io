import React, { Component } from 'react';
import axios from 'axios';

import Card from './Card';

class UserCards extends Component {  
  constructor(){
    super();
    this.state={
      userCardData: null,
    }
  }

  componentDidMount(){
    axios.get('/usercard')
    .then(res=>{
      console.log(res.data)
      this.setState({
        userCardData:res.data,
      })
    })
    .catch(err=>{
      console.log(err);
    })
  }

  render() {
    return (
      <div className='UserCards'>
        {this.state.userCardData ? 
          this.state.userCardData.map(data=>{
            return <div key={data.id} className={`single-card ${data.class}`} >
                              <div className='card-name'><b>{data.name}</b>
                                                      <p>{data.class}</p></div>
                              {/*<div className='card-img'><img src={data.image_url} alt='' /></div>*/}
                              <div className='card-numbers'><p>Attack {data.attack}</p>
                                                            <p>Defense {data.defense}</p></div>
                            </div>
          }) : ''
        }
      </div>
    )
  }
}

export default UserCards;