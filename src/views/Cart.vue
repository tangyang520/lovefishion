<template>
    <div class="cart">
        <header class="cart-header">
            <h3>购物车</h3>
        </header>
        <main class="main" v-if="list.length>0">
           <div class="gooditem"
                v-for="(item,index) in list"
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
                <div class="btns">
                    <span class="sub" @click="sub(item.id)">-</span>
                    <span class="num">{{item.count}}</span>
                    <span class="add" @click="add(item.id)">+</span>
                </div> 
            </div>
        </main>
        <div class="empty" v-else>
            <img src="../../public/images/没有更多.png" alt="">
            <div>您的购物车还是空的哦!</div>
        </div>
        <footer class="footer">
            <div class="left">
                <div class="count">总数：{{total}}</div>
                <div class="total">总价：{{totalPrice}}</div>
            </div>
            <div class="right">
                <h2 @click="tiao">去结算</h2>
            </div>
        </footer>
    </div>
</template>

<script>


export default { 
    data:function(){
        return {
            list:[]
        }  
    },
    methods:{
        add:function(id){
            let count=this.list.find((item,index)=>{
                return item.id==id
            })
            if(count){
                if(count.count<5){
                    count.count++
                }
            }
            localStorage.setItem("key",JSON.stringify(this.list))
        },
        sub:function(id){
            let count1=this.list.find((item,index)=>{
                return item.id==id
            })
            if(count1){
                if(count1.count>1){
                    count1.count--
                }
            }
            localStorage.setItem("key",JSON.stringify(this.list))
        },
        // 跳转路由
        tiao:function(){
            this.$router.push("/payment")
        }
    },
    computed:{
        // 计算总数量
        total:function(){
            return this.list.reduce(function(prev,next){
                return prev+next.count 
            },0)
        },
         // 计算总价格
        totalPrice:function(){
            return this.list.reduce(function(prev,next){
                return prev+next.count * next.price
            },0)
        }
    },
    mounted:function(){
        // 从本地存储中取出加入到购物车的数据，并保存到data中
        this.list=localStorage.getItem("key")?JSON.parse(localStorage.getItem("key")):[]
    }
}
</script>

<style lang="scss" scoped>
.cart{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}
.cart-header{
    width: 100%;
    height: 40px;
    padding-left: 20px;
    line-height: 40px;
}
.main{
    flex:1;
    overflow: scroll;
}
.gooditem{
    display: flex;
    margin :20px 10px;
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
    .btns{
        position: absolute;
        right: 20px;
        bottom: 20px;
        .sub,.add{
            display: inline-block;
            width: 22px;
            height: 22px;
            background: skyblue;
            border-radius: 50%;
            text-align: center;
            line-height: 22px;
        }
        span{
            margin:0 8px;
        }
    }
}
.empty{
    flex:1;
    display: flex;
    padding-top: 30px;
    flex-direction: column;
    align-items: center;
    line-height: 50px;
    font-size: 14px;
}
.footer{
    height: 60px;
    display: flex;
    line-height: 60px;
    .left{
        width: 70%;
        display: flex;
        background: #666666;
        text-align: center;
        color:#fff;
        .count{
            width: 40%;
        }
        .total{
            width: 60%;
        }
    }
    .right{
        text-align: center;
        color:#fff;
        width: 30%;
        background: #14ee87;
    }
}
</style>
