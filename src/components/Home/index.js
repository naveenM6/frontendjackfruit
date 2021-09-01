import {Component} from 'react'
import {Redirect} from 'react-router-dom';
import Cookies from 'js-cookie'

import './index.css'


class Home extends Component {

    state = {bas:'',fa:'',lta:'',hra:'',inv:'',rent:'',city:'metro',med:'',amount:'',showMsg:false};

    onSubmit = async e => {
        e.preventDefault()
        const {bas,fa,lta,hra,inv,rent,med,city,amount} = this.state;

        if(bas === '' || fa === '' || lta === '' || hra === '' || inv === '' || rent === '' || med === ''){
            this.setState({showMsg: true})
        }else{
            this.setState({showMsg: false})
            let appBas = null;
            let appRent=null;
            if(city === 'metro'){
                appBas = (50/100) * parseInt(bas);
                appRent = rent - (10/100) * bas;
            }else{
                appBas = (40/100) * parseInt(bas);
                appRent = rent - (10/100) * bas;
            }
            const li = [appBas, appRent,hra];
            li.sort()
            const appHRA = li[0];
            const taxInc = (bas + lta + hra + fa) - appHRA - inv - med;
            this.setState({amount: taxInc});

            const url = `http://localhost:5004/posts`;

            const options = {
                headers:{
                    "content-type": "application/json"
                  },
                method: 'POST', 
                body: JSON.stringify(
                    {BAS:bas,FA:fa,LTA:lta,HRA:hra,INV:inv,RENT:rent,MED:med,CITY:city,TAXABLE:amount}
                )
            }

            const response = await fetch(url, options);

            console.log(response);

        }
    }

    render(){
        const jwtToken = Cookies.get('jwt_token')
        if (jwtToken === undefined) {
            return <Redirect to="/login" />
        }

        const {amount,showMsg} = this.state;

        return(
                <div className="home-container">
                    <form onSubmit={this.onSubmit} className="home-form-container">
                        <div>
                            <input type="text" className="basic-salary home-input" placeholder="BSA" onChange={e => this.setState({bas: parseFloat(e.target.value)})}/>
                            <input type="text" className="leave-allownce home-input" placeholder="LTA" onChange={e => this.setState({lta: parseFloat(e.target.value)})}/>
                            <input type="text" className="home-allowence home-input" placeholder="HRA" onChange={e => this.setState({hra: parseFloat(e.target.value)})}/>
                            <input type="text" className="food-allowence home-input" placeholder="FA" onChange={e => this.setState({fa: parseFloat(e.target.value)})}/>
                        </div>
                        <input type="text" className="form-control home-input" placeholder="Inv" onChange={e => this.setState({inv: parseFloat(e.target.value)})}/> 
                        <input type="text" className="form-control home-input" placeholder="Rent" onChange={e => this.setState({rent: parseFloat(e.target.value)})}/>
                        <select name="cities" className="form-control home-input" onChange={e => this.setState({city: parseFloat(e.target.value)})}>
                            <option value="metro">Metro</option>
                            <option value="non-metro">Non-Metro</option>
                        </select>
                        <input type="text" className="form-control home-input" placeholder="Med" onChange={e => this.setState({med: parseFloat(e.target.value)})}/>
                        {showMsg && <p className="home-err-msg">*Fill all details before Submit</p>}
                        <button type="submit" className="submit-btn">Submit</button>
                    </form>
                    <h1>Taxable Income :- {amount}</h1>
                </div>
        )
    }
}

export default Home