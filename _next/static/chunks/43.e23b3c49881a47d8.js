(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[43],{29122:()=>{},47790:()=>{},50235:(e,r,t)=>{"use strict";t.r(r),t.d(r,{MintPage:()=>g,default:()=>x});var n=t(76985),a=t(82837),s=t.n(a),c=t(48039),l=t(51350),o=t(15161),i=t(12115),u=t(93403),p=t(72413),d=t(13552),b=t(95155),h=new u.PublicKey("3HE6EtGGxMRBuqqhz2gSs3TDRXebSc8HDDikZd1FYyJj"),f=.001*u.LAMPORTS_PER_SOL;function g(){var e,r,t=(0,c.v)(),a=t.publicKey,g=t.signTransaction,x=(0,l.w)().connection,m=(0,i.useState)(!1),k=m[0],v=m[1],y=(0,c.v)(),w=(e=(0,n.A)(s().mark(function e(){var r,t,n,c;return s().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!(!a||!g)){e.next=3;break}return alert("Пожалуйста, подключите кошелек!"),e.abrupt("return");case 3:return e.prev=3,v(!0),r=u.SystemProgram.transfer({fromPubkey:a,toPubkey:h,lamports:f}),(t=new u.Transaction().add(r)).feePayer=a,e.next=10,x.getLatestBlockhash();case 10:return t.recentBlockhash=e.sent.blockhash,e.next=13,g(t);case 13:return n=e.sent,e.next=16,x.sendRawTransaction(n.serialize());case 16:console.log("Transaction ID:",c=e.sent),alert("Транзакция отправлена. TXID: "+c),e.next=25;break;case 21:e.prev=21,e.t0=e.catch(3),console.error("Ошибка при отправке SOL:",e.t0),alert("Ошибка: ".concat(e.t0 instanceof Error?e.t0.message:String(e.t0)));case 25:return e.prev=25,v(!1),e.finish(25);case 28:case"end":return e.stop()}},e,null,[[3,21,25,28]])})),function(){return e.apply(this,arguments)}),N=(r=(0,n.A)(s().mark(function e(){var r,t,n;return s().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(a){e.next=3;break}return alert("Пожалуйста, подключите кошелек!"),e.abrupt("return");case 3:return e.prev=3,v(!0),r=p.X.make(x).use((0,d.H)(y)),e.next=8,r.nfts().create({uri:"https://arweave.net/123",name:"My Programmable NFT",sellerFeeBasisPoints:500,symbol:"PNFT",creators:[{address:a,share:100}],isMutable:!0,tokenStandard:4,ruleSet:null});case 8:console.log("Created pNFT:",{mintAddress:n=(t=e.sent.nft).address.toString(),name:t.name,symbol:t.symbol,uri:t.uri}),alert("pNFT создан успешно! Mint address: ".concat(n)),e.next=19;break;case 15:e.prev=15,e.t0=e.catch(3),console.error("Ошибка при создании pNFT:",e.t0),alert("Ошибка: ".concat(e.t0 instanceof Error?e.t0.message:String(e.t0)));case 19:return e.prev=19,v(!1),e.finish(19);case 22:case"end":return e.stop()}},e,null,[[3,15,19,22]])})),function(){return r.apply(this,arguments)});return(0,b.jsxs)("div",{className:"p-3",children:[(0,b.jsx)(o.x,{className:"rounded-none bg-purple-700 text-white shadow-xl"}),a&&(0,b.jsxs)("div",{className:"flex flex-col gap-4",children:[(0,b.jsx)("button",{onClick:w,disabled:k,className:"mt-5 px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 disabled:bg-gray-400",children:k?"Processing...":"Send 0.001 SOL"}),(0,b.jsx)("button",{onClick:N,disabled:k,className:"px-4 py-2 bg-purple-500 text-white  hover:bg-purple-600 disabled:bg-gray-400",children:k?"Creating pNFT...":"Create pNFT"})]})]})}let x=g}}]);