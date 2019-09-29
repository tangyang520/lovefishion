<template>
    <div class="home">
        <div class="header">
            <img src="../../public/images/avatar.jpg" alt="">
        </div>
        <div class="textbox">
            <h3>爱时尚精品屋</h3>
            <p>公告:欢迎光临,流行爆款库存有限请尽早下单,谢谢.</p>
        </div>
        <div class="navbox">
            <span
                class="nav-item"
                v-for="(item,index) in navlist"
                :key="index"
                :class="{active:index==curIndex}"
                @click="sort(index)"
            >{{item}}</span>
        </div>
        <div class="list">
            <div class="gooditem"
                v-for="(item,index) in goodlist"
                :key="index"
            >
                <div class="imgbox">
                    <img :src="item.pic" alt="">
                </div>
                <div class="text">
                    <h3>{{item.name}}</h3>
                    <p>已售：{{item.buyCount}}件</p>
                    <p>单价：￥{{item.price}}</p>
                </div>
                <div class="btn" @click="addcart(item)">
                    加入购物车
                </div>
            </div>
        </div>
        <div class="gwc"  @click="cart()">
            <img src="../../public/images/cart.png" alt="">
            <span class="total">{{total}}</span>
        </div>
    </div>
</template>

<script>

import axios from "axios"

export default {
    // 用来存放数据
    data:function(){
        return{
            cartlist:[],    //购物车商品数据
            navlist:["价格升序↑","价格降序↓","销量升序↑","销量降序↓"],
            curIndex:0,
            goodlist:[],   //全部商品数据 
        }
    },
    // 计算属性
    computed:{
        // 计算总数量
        total:function(){
            return this.cartlist.reduce(function(prev,next){
                return prev+next.count 
            },0)
        }
    },
    // 用来存放定义的方法
    methods:{
        // 定义排序方法
        sort:function(index){
            this.curIndex=index;
            if(index==0){
                this.goodlist.sort(function(A,B){
                    return A.price-B.price
                })
            }else if(index==1){
                this.goodlist.sort(function(A,B){
                    return B.price-A.price
                }) 
            }else if(index==2){
                this.goodlist.sort(function(A,B){
                    return A.buyCount-B.buyCount
                }) 
            }else{
                this.goodlist.sort(function(A,B){
                    return B.buyCount-A.buyCount
                }) 
            }
        },
        // 定义方法,点击时跳转路由
        cart:function(){
            this.$router.push("/cart")
        },
        // 点击加入购物车事件
        addcart:function(item){
            // 先从本地取数据，如果有数据就转成对象，如果没有，就拿一个空数组出来
            var cartlist=localStorage.getItem("key")?JSON.parse(localStorage.getItem("key")):[];
            // 从取出来的数据中通过传进来的id查找，如果查找到，就将它抛出来
            var gooditem=cartlist.find(function(good,index){
                return item.id==good.id
            })

            // 如果是第一次往购物车里添加商品，那么就让它的数量等于1
            if(!gooditem){
                item.count=1
                // 并且将其添加到购物车数据中
                cartlist.push(item)
            }else{
                // 如果不是第一次添加商品，那么直接让它的数量加加就可
                if(gooditem.count<5){
                    gooditem.count++
                }    
            }

            // 将从本地取出来的数据存到data中
            this.cartlist=cartlist
            // 将更新后的购物车数据转成字符串重新存到本地里
            localStorage.setItem("key",JSON.stringify(cartlist))
        }
    },
    // 生命周期 用来发送ajax请求
    mounted:function(){
        axios.get("https://yantianfeng.com/api/goodList").then(res=>{
            this.goodlist=res.data.goodList
        });

        this.cartlist=localStorage.getItem("key")?JSON.parse(localStorage.getItem("key")):[]
    }
}
</script>

<style lang="scss">
.home{
    width: 100%;
    height: 100%;
    position: relative;
}
.header{
    width: 100%;
    height: 200px;
    background-image: url("../../public/images/banner-2.png");
    background-position-x: center;
    background-size: cover;
    position: relative;
    img{
        width: 80px;
        height: 80px;
        border-radius: 50%;
        position: absolute;
        bottom: -40px;
        left: 50%;
        margin-left: -40px;
    }
}
.textbox{
    width: 100%;
    margin-top: 50px;
    text-align: center;
    h3{
        color:#767676;
    }
    p{
        color:#626262;
        font-size: 14px;
        line-height: 40px;
    }
}
.navbox{
    width: 100%;
    height: 40px;
    line-height: 40px;
    display: flex;
    text-align: center;
    .active{
        color:red;
    }
}
.navbox span{
    flex:1;  
}
.list{
    margin:20px;
    .gooditem{
        display: flex;
        margin :20px 0;
        position: relative;
        .imgbox{
            width: 30%;
            margin-right: 10px;
            img{
                width: 100%;
            }
        }
        .text{
            width: 70%;
            h3{
                font-size: 16px;
                line-height: 30px;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
            }
            p{
                line-height: 30px;
            }
        }
        .btn{
            position: absolute;
            right: 0;
            bottom: 5px;
            background: red;
            padding:5px 15px;
            color:#fff;
        }
        .btn:active{
            opacity: 0.5;
        }
    }
}
.gwc{
    width: 50px;
    height: 50px;
    line-height: 75px;
    text-align: center;
    background: #00bfff;
    border-radius: 50%;
    position: fixed;
    right: 25px;
    bottom: 10%;
    img{
        width: 70%;
        height: 70%;
    }
    .total{
        display: inline-block;
        width: 20px;
        height: 20px;
        text-align: center;
        line-height: 20px;
        background: red;
        position: absolute;
        right: 0;
        top: -5px;
        color:#fff;
        border-radius: 50%;
    }
}
</style>
