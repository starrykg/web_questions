import React, { Component } from "react";
import axios from 'axios';
import url from 'url';
import {Checkbox} from "antd";

export default class TestList extends Component{
    constructor(props) {
        super(props);
        this.state={
            openshow: false,
            listData:'',
            surenum:0,
            errornum:0,
            errdatalist:[],
            alertshow: false,
            alerttext:'',
            alertshow2:false,
            alerttext2:'',
            active: 1,
            gradingnum:0,
            accuracy:0,
            listnum:0
        }
        this.open = this.open.bind(this);
        this.choice = this.choice.bind(this);
    }
    componentDidMount() {
        let search = this.props.location.search;
        let id = url.parse(search, true).query.id;
        console.log(id)
        let _this = this;
        //请求数据
        axios({
            methods: 'get',
            //url: `http://127.0.0.1:9999/${id}`,
            url: `http://127.0.0.1:9999/quests`,
            headers:{"Content-Type":"application/x-www-form-urlencoded"},
            }).then(function (response) {
                console.log(response)
                let newdata = response.data.map(function (item){
                    return {...item,state:false,openshow:false}
                })
                _this.setState({
                    listData:newdata
                })
                _this.state.listnum = newdata.length;
            })
            .catch(function (error) {
              console.log(error);
            })
    }
    //查看答案
    open(i){
        if(this.state.listData[i].state === true){
            var val = !this.state.list[i].openshow;
            var valListData = this.state.listData;
            valListData[i].openshow = val;
            this.setState({
                listData: valListData
            })

            let newlist = Object.assign([],this.state.listData);
            this.setState({
                listData: newlist
            })
        }else{
            this.showalert("请先选择答案!")
        }
    }
    //正确与否提示
    showalert(text){
        let _this = this;
        this.setState({
        alerttext:text,
        alertshow:true
        })
        setTimeout(function(){
        _this.setState({
            alerttext:'',
            alertshow:false
        })
        },2000)
    }
    //选择答案
    choice(e,i){
        if(e.target.dataset.id !== undefined){
            console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",this.state.listData[i].correct,e.target.dataset.id,this.state.listData[i].correct === e.target.dataset.id)
            if(this.state.listData[i].correct === e.target.dataset.id){
                //正确答案计数
                var val = this.state.surenum;
                val +=1
                this.setState({
                    surenum: val
                })
                //正确提示
                this.showalert(`答对${val}题!`)
                judge(this)
            }else{
                //错误答案计数
                var nm = this.state.errornum;
                nm += 1;
                this.setState({
                    errornum: nm
                })
                this.showalert("要加油哟!")
                judge(this)
                let errdata = {
                    title: this.state.listData[i].title,
                    explain: this.state.listData[i].explain,
                    link: this.state.listData[i].link
                }
                this.state.errdatalist.push(errdata);
                let obj = {};
                let person;
                person = this.state.errdatalist.reduce((cur,next) => {
                    if(obj[next.title] === undefined){
                        obj[next.title] = true && cur.push(next)
                    }
                    return cur;
                },[])
                let newerrlist = Object.assign([],person);
                this.setState({
                    errdatalist: newerrlist
                })
            }
            //正确率定级
            function judge(_this){
                if(_this.state.surenum >= 3){
                    _this.state.accuracy = _this.state.surenum/_this.state.listnum;
                }
            }
            var nmListData = this.state.listData
            nmListData[i].state = true;
            this.setState({
                listData: nmListData
            })

            let newlist = Object.assign([],this.state.listData);
            this.setState({
                listData: newlist
            })
        }
    }
    listdata(){
        let list;
        if(this.state.listData !== ""){
            list = this.state.listData.map((item,i)=>{
                return (
                    <div className="list" key={i} onClick={(e)=>this.choice(e,i)}>
                        <p className="question"><span>{i+1}问：</span>{item.title}</p>
                        <p className="answer">答：</p>
                        <ul className="answer_list">
                            {item.answer.map((item,i)=>{
                                return <div><Checkbox data-id={i} key={i}>{item}</Checkbox></div>
                            })}
                        </ul>
                        <div className="explain">
                            <p className="explain_title" onClick={()=>this.open(i)}>答案<span className={
                                item.openshow === true?'explain_triangle_df':'explain_triangle'
                            }></span></p>
                            {item.openshow  === true ?
                                <div className="explain_content">
                                    <p dangerouslySetInnerHTML={{__html: item.explain}}></p>
                                    <h3>相关链接：<a href={item.link}>{item.link}</a></h3>
                                </div>
                            : ''}
                        </div>
                    </div> 
                )
            })
        }
        return list;
    }
    errlistfn(){
        let errlist;
        if(this.state.errdatalist.length !== 0){
            errlist = this.state.errdatalist.map((item,i)=>{
                return(
                    <div key={i} className="err_list">
                        <p className="question"><span>错题{i+1}：</span>{item.title}</p>
                        <p className="answer_p"><span>答案：</span>{item.explain}</p>
                        <h3 className="err_relevant">相关链接：<a href={item.link}>{item.link}</a></h3>
                    </div>
                )
            })
        }
        return errlist;
    }
    render() {
        return (
            <>
            <div className="answer_title">{this.listdata()}</div>
            <div className="errrep">
                <h3 className="errrep_title">答题报告:
                    <span className="errrep_sure">正确次数:{this.state.surenum}</span>
                    <span className="errrep_num">错误次数:{this.state.errornum}</span>
                    <span className="errrep_sure">正确率:{this.state.accuracy}</span>
                </h3>
                <div>{this.errlistfn()}</div>
            </div>
            {
                this.state.alertshow === true ? <div className="alertshow">{this.state.alerttext}</div>: ''
            }
            {
                this.state.alertshow2 === true ? <div className="alertshow2">{this.state.alerttext2}</div>: ''
            }
            </>
        );
    }
}