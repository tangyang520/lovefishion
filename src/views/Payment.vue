<template>
    <div class="pay-page">
        <div class="block">
            <div class="title">收货地址</div>
            <div class="list"> 
                <div class="item"
                    v-for="(item,index) in addresslist" 
                    :key="item.id"
                    :class="{active:addressIndex==index}"
                    @click="selectAddress(index)"
                >
                    {{item.address}}
                </div>
            </div>
        </div>
        <div class="block">
            <div class="title">支付方式</div>
            <div class="list"> 
                <div class="item" 
                    v-for="(item,index) in paylist" 
                    :key="item.id"
                    :class="{active:payIndex==index}"
                    @click="selectPay(index)"
                >
                    {{item.pay}}
                    <img :src="item.pic" />
               </div>
            </div>
        </div>
        <footer class="footer">
            <div class="left">
                <div class="total">总价：</div>
            </div>
            <div class="right">
                <h2>去结算</h2>
            </div>
        </footer>
    </div>
</template>

<script>
export default {
    data:function(){
        return{
            addresslist:[
                {
                    id:1,
                    address:"河南省-开封市-上帝之巅"
                },
                {
                    id:2,
                    address:"河南省-开封市-太平天国"
                },
                {
                    id:3,
                    address:"河南省-开封市-密西西比"
                },
            ],
            paylist:[
                {
                    id:4,
                    pay:"微信",
                    pic:require("../../public/images/微信.png")
                },
                {
                    id:5,
                    pay:"支付宝",
                    pic:require("../../public/images/支付宝认证.png")
                },
                {
                    id:6,
                    pay:"银联",
                    pic:require("../../public/images/支付平台-银联.png")
                },
            ],
            addressIndex:0,
            payIndex:0
        }
    },
    methods:{
        selectAddress:function(index){
            this.addressIndex=index
        },
        selectPay:function(index){
            this.payIndex=index
        }
    }
}
</script>

<style scoped lang="scss">
.block{
    margin-top: 10px;
    background: #f5f5f5;
    .title{
        line-height: 40px;
        padding-left: 15px;
        font-weight: bold;
    }
    .item{
        border-top: 1px solid #ccc;
        line-height: 50px;
        display: flex;
        align-items: center;
        padding-left: 20px;
        img{
            width: 30px;
            margin-left: 20px;;
        }
    }
    .active{
        background-size: 20px;
        background-image: url("../../public/images/check.png");
        background-position: right center;
        background-repeat: no-repeat;
    }
}

.footer{
    width: 100%;
    height: 60px;
    display: flex;
    line-height: 60px;
    position: fixed;
    bottom: 0;
    left: 0;
    .left{
        width: 70%;
        display: flex;
        background: #666666;
        text-align: center;
        color:#fff;
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
