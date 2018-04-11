<template>
  <div class="notice-box">
    <h5>币种介绍</h5>
    <div>
      <ul>
        <li class="label" :class="{'active':isactive==9}" @click = "fn(9)">USDT</li>
        <li class="label" :class="{'active':isactive==1}" @click = "fn(1)">BTC比特币</li>
        <li class="label" :class="{'active':isactive==10}" @click = "fn(10)">BTY比特元</li>
        <!-- <li class="label" :class="{'active':isactive==11}" @click = "fn(11)">YCC原链</li> -->
        <li class="label" :class="{'active':isactive==8}" @click = "fn(8)">BCC比特现金</li>
        <li class="label" :class="{'active':isactive==2}" @click = "fn(2)">ETH以太坊</li>
        <li class="label" :class="{'active':isactive==3}" @click = "fn(3)">ETC以太坊经典</li>
        
        <li class="label" :class="{'active':isactive==5}" @click = "fn(5)">ZEC零币</li>
        
        <li class="label" :class="{'active':isactive==7}" @click = "fn(7)">LTC莱特币</li>
        <li class="label" :class="{'active':isactive==6}" @click = "fn(6)">BTS比特股</li>
        <li class="label" :class="{'active':isactive==4}" @click = "fn(4)">SC云储币</li>
        <li class="label" :class="{'active':isactive==12}" @click = "fn(12)">DCR德信币</li>
        <!--  <li class="label" :class="{'active':isactive==8}" @click = "fn(8)">YCC原链币</li>
        <li class="label" :class="{'active':isactive==9}" @click = "fn(9)">WDT我的钱包</li> -->
      </ul>
    </div>
    <div v-if="showHide==1">
      <div>
        <p class="main-1">比特币（BTC）简介</p>
      </div>
      <div class="intro">
        <div class="intro-left">
          <span class="name1">中文名：</span>
          <span class="name2">比特币</span>
        </div>
        <div class="intro-right">
          <span class="name1 ">英文名：</span>
          <span class="name2 ">Bitcoin</span>
        </div> 
        
      </div>
      <div class="intro">
        <div class="intro-left">
          <span class="name1" >简称：</span>
          <span class="name2">BTC</span>  
        </div>
        <div class="intro-right">
          <span class="name1">货币总量：</span>
        <span class="name2">2100万</span>
        </div>
        
      </div>
      <div class="intro">
        <div class="intro-left">
          <span class="name1">区块时间：</span>
          <span class="name2">10分钟</span> 
        </div>
        <div class="intro-right">
          <span class="name1">发布时间：</span>
        <span class="name2">2009-01-09</span>
        </div> 
      </div>
      <div class="intro">
        <div class="intro-left">
          <span class="name1">挖矿方式：</span>
          <span class="name2">CPU</span> 
        </div>
        <div class="intro-right">
          <span class="name1">核心算法：</span>
          <span class="name2">SHA-256</span>
        </div>
      </div>
      <div>
        <p class="title-1">主要特色：</p>
        <p class="main-2">虚拟币始创者，受众最广，被信任最高</p>
        <p class="title-1">主要介绍：</p>
        <p class="main-2 main-3">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;比特币（BitCoin）的概念最初由中本聪在2009年提出，根据中本聪的思路设计发布的开源软件以及建构其上的P2P网络。比特币是一种P2P形式的数字货币。点对点的传输意味着一个去中心化的支付系统。与大多数货币不同，比特币不依靠特定货币机构发行，它依据特定算法，通过大量的计算产生，比特币经济使用整个P2P网络中众多节点构成的分布式数据库来确认并记录所有的交易行为，并使用密码学的设计来确保货币流通各个环节安全性。P2P的去中心化特性与算法本身可以确保无法通过大量制造比特币来人为操控币值。基于密码学的设计可以使比特币只能被真实的拥有者转移或支付。这同样确保了货币所有权与流通交易的匿名性。比特币与其他虚拟货币最大的不同，是其总数量非常有限，具有极强的稀缺性。该货币系统曾在4年内只有不超过1050万个，之后的总数量将被永久限制在2100万个。比特币可以用来兑现，可以兑换成大多数国家的货币。使用者可以用比特币购买一些虚拟物品，比如网络游戏当中的衣服、帽子、装备等，只要有人接受，也可以使用比特币购买现实生活当中的物品。</p>
      </div>      
    </div>
    <div v-if="showHide==2">
      <div>
        <p class="main-1">以太坊（ETH）简介</p>
      </div>
      <div class="intro">
        <div class="intro-left">
          <span class="name1" >中文名：</span>
          <span class="name2">以太坊</span> 
        </div>
        <div class="intro-right">
          <span class="name1">英文名：</span>
          <span class="name2">Ethereum</span>
        </div>
      </div>
      <div class="intro">
        <div class="intro-left">
          <span class="name1">简称：</span>
          <span class="name2">ETH</span> 
        </div>
        <div class="intro-right">
          <span class="name1">货币总量：</span>
        <span class="name2">7200万+1872万/年</span>
        </div> 
        
      </div>
      <div class="intro">
        <div class="intro-left">
          <span class="name1">区块时间：</span>
          <span class="name2">12秒</span> 
        </div>
        <div class="intro-right">
          <span class="name1">发布时间：</span>
          <span class="name2">2015-03-20</span>
        </div>
      </div>
      <div class="intro">
        <div class="intro-left">
          <span class="name1">挖矿方式：</span>
          <span class="name2"></span>  
        </div>
        <div class="intro-right">
          <span class="name1">核心算法：</span>
          <span class="name2">Ethash</span>
        </div>
      </div>
      <div>
        <p class="title-1">主要特色：</p>
        <p class="main-2">国内外人气高，技术实力雄厚</p>
        <p class="title-1">主要介绍：</p>
        <p class="main-2 main-3">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ethereum（以太坊）是一个平台和一种编程语言，使开发人员能够建立和发布下一代分布式应用。 以太坊（Ethereum）并不是一个机构，而是一款能够在区块链上实现智能合约、开源的底层系统，以太坊从诞生到2017年5月，短短3年半时间，全球已有200多个以太坊应用诞生。 以太坊是一个平台和一种编程语言，使开发人员能够建立和发布下一代分布式应用。 以太坊可以用来编程，分散，担保和交易任何事物：投票，域名，金融交易所，众筹，公司管理， 合同和大部分的协议，知识产权，还有得益于硬件集成的智能资产。</p>
      </div>      
    </div>
    <div v-if="showHide==3">
      <div>
        <p class="main-1">以太坊经典（ETC）</p>
      </div>
      <div class="intro">
        <div class="intro-left">
          <span class="name1">中文名：</span>
          <span class="name2">以太坊经典</span>  
        </div>
        <div class="intro-right">
          <span class="name1">英文名：</span>
        <span class="name2">Ethereum Classic</span>
        </div>
        
      </div>
      <div class="intro">
        <div class="intro-left">
          <span class="name1">简称：</span>
          <span class="name2">ETC</span> 
        </div>
        <div class="intro-right">
          <span class="name1">货币总量：</span>
          <span class="name2">2.3亿</span>
        </div>
      </div>
      <div class="intro">
        <div class="intro-left">
          <span class="name1">区块时间：</span>
          <span class="name2"></span>
        </div>
        <div class="intro-right">
          <span class="name1">发布时间：</span>
          <span class="name2">2015-11-01</span>
        </div>
      </div>
      <div class="intro">
        <div class="intro-left">
          <span class="name1">挖矿方式：</span>
          <span class="name2">POW</span> 
        </div>
        <div class="intro-right">
          <span class="name1">核心算法：</span>
          <span class="name2"></span>
        </div> 
      </div>
      <div>
        <p class="title-1">主要介绍：</p>
        <p class="main-2 main-3">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ETC是以太坊在1,920,000个块后硬分叉出的分叉币种，功能和以太坊极为类似。ETC秉承去中心化理念，通过区块链保证的共识机制。ETC坚信，区块链一旦开始运行，它的发展方向就不被任何中心团队所左右，而是按照参与整个网络人员的共识和全网算力的共识所决定。</p>
      </div>      
    </div>
    <div v-if="showHide==4">
      <div>
        <p class="main-1">云储币（SC）简介</p>
      </div>
      <div class="intro">
        <div class="intro-left">
          <span class="name1">中文名：</span>
          <span class="name2">云储币</span>
        </div>
        <div class="intro-right">
          <span class="name1">英文名：</span>
          <span class="name2">Siacoin</span>
        </div>
      </div>
      <div class="intro">
        <div class="intro-left">
          <span class="name1">简称：</span>
          <span class="name2">SC</span>  
        </div>
        <div class="intro-right">
          <span class="name1">货币总量：</span>
          <span class="name2">445.5亿</span>
        </div>
      </div>
      <div class="intro">
        <div class="intro-left">
          <span class="name1">区块时间：</span>
          <span class="name2">10分钟</span>
        </div>
        <div class="intro-right">
          <span class="name1">发布时间：</span>
          <span class="name2">2015-07-03</span>
        </div>
      </div>
      <div class="intro">
        <div class="intro-left">
          <span class="name1">挖矿方式：</span>
          <span class="name2">POW</span> 
        </div>
        <div class="intro-right">
          <span class="name1">核心算法：</span>
          <span class="name2">Reed-Solomn算法</span>
        </div> 
      </div>
      <div>
        <p class="title-1">主要特色：</p>
        <p class="main-2">加密与奖励机制；去中心化与备份；Sia如何应对Sybil攻击；</p>
        <p class="title-1">主要介绍：</p>
        <p class="main-2 main-3">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Sia最初的设计目的是：让云储存去中心化。在这个平台上可以存放和提取各种各样的文件，并不需要为您的文件隐私和安全担心。通过运用加密技术，加密合约，和重复备份，Sia 能够使一群互不信任的和互不了解的计算机节点联合起来成为一种有统一运行逻辑和程序的云储存平台。 这种平台将比传统的云储存平台更快，更便宜，和更可靠。因为这些互不信任的计算机节点分布于世界各地，Sia 可以在无需添加成本的情况下成为一个有效的文件及其内容的分销网络。文件上传者可以自由选择他们所使用的节点，这意味着他们可以避开一定区域内的节点，或只用那些他们认为可信的节点。去中心化是指把上传的一个文件分成许多小块并把每个小块存放在不同的计算机节点上。在这些存放文件的节点中，只需一小部分节点是可信任的，就可以使上传文件既安全又可靠。</p>
      </div>      
    </div>
    <div v-if="showHide==5">
      <div>
        <p class="main-1">零币（ZEC）简介</p>
      </div>
      <div class="intro">
        <div class="intro-left">
          <span class="name1">中文名：</span>
          <span class="name2">零币</span> 
        </div>
        <div class="intro-right">
          <span class="name1">英文名：</span>
          <span class="name2">ZCash</span>
        </div>
      </div>
      <div class="intro">
        <div class="intro-left">
          <span class="name1">简称：</span>
          <span class="name2">ZEC</span>
        </div>
        <div class="intro-right">
          <span class="name1">货币总量：</span>
          <span class="name2">2100万</span>
        </div> 
      </div>
      <div class="intro">
        <div class="intro-left">
          <span class="name1">区块时间：</span>
          <span class="name2">150秒/块</span> 
        </div>
        <div class="intro-right">
          <span class="name1">发布时间：</span>
          <span class="name2">2016-10-28</span>
        </div>
      </div>
      <div class="intro">
        <div class="intro-left">
          <span class="name1">挖矿方式：</span>
          <span class="name2">POW</span>
        </div>
        <div class="intro-right">
          <span class="name1">核心算法：</span>
          <span class="name2">EquiHash</span>
        </div>  
      </div>
      <div>
        <!-- <p class="title-1">主要特色：</p>
        <p class="main-2">加密与奖励机制；去中心化与备份；Sia如何应对Sybil攻击；</p> -->
        <p class="title-1">主要介绍：</p>
        <p class="main-2 main-3">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Zcash（ZEC）是一种采用零知识证明算法的透明和匿名性共存的新型加密数字资产，采用EquiHash算法和PoW的方式构建适合普通电脑挖矿的分发机制。发行总量与比特币相同2100万。</p>
      </div>      
    </div>
    <div v-if="showHide==6">
      <div>
        <p class="main-1">比特股（BTS）简介</p>
      </div>
      <div class="intro">
        <div class="intro-left">
          <span class="name1">中文名：</span>
          <span class="name2">比特股</span>
        </div>
        <div class="intro-right">
          <span class="name1">英文名：</span>
          <span class="name2">Bitshares</span>
        </div>
      </div>
      <div class="intro">
        <div class="intro-left">
          <span class="name1">简称：</span>
          <span class="name2">BTS</span> 
        </div>
        <div class="intro-right">
          <span class="name1">货币总量：</span>
          <span class="name2">20亿</span>
        </div>
      </div>
      <div class="intro">
        <div class="intro-left">
          <span class="name1">区块时间：</span>
          <span class="name2">10秒</span>
        </div>
        <div class="intro-right">
          <span class="name1">发布时间：</span>
          <span class="name2">2014-07-19</span>
        </div>
      </div>
      <div class="intro">
        <div class="intro-left">
          <span class="name1">挖矿方式：</span>
          <span class="name2">CPU</span>  
        </div>
        <div class="intro-right">
          <span class="name1">核心算法：</span>
          <span class="name2">DPoS</span>
        </div>
      </div>
      <div>
        <p class="title-1">主要特色：</p>
        <p class="main-2">构思宏伟、公司开发、知名度高、分发相对公平</p>
        <p class="title-1">主要介绍：</p>
        <p class="main-2 main-3">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;BitShares是一项测试一种新型“可预测市场(Prediction Market)”背后的经济理论的实验。该实验创建了去中心化的银行和交易所，使用由DPoS保障安全的去中心化交易总账来创造可互换数字资产，这些资产可以市场化锚定美元、黄金、汽油等任何东西的价值。和所有的DAC一样，比特股 X拥有可以像比特币那样在用户间转让的股权。比特股 X的特殊之处是它实施了一个类似于银行或经纪公司的商业模式。</p>
      </div>      
    </div>
    <div v-if="showHide==7">
      <div>
        <p class="main-1">莱特币（LTC）简介</p>
      </div>
      <div class="intro">
        <div class="intro-left">
          <span class="name1">中文名：</span>
          <span class="name2">莱特币</span>
        </div>
        <div class="intro-right">
          <span class="name1">英文名：</span>
          <span class="name2">Litecoin</span>
        </div>  
      </div>
      <div class="intro">
        <div class="intro-left">
          <span class="name1">简称：</span>
          <span class="name2">LTC</span> 
        </div>
        <div class="intro-right">
          <span class="name1">货币总量：</span>
          <span class="name2">8400万</span>
        </div>
      </div>
      <div class="intro">
        <div class="intro-left">
          <span class="name1">区块时间：</span>
          <span class="name2">150秒</span>
        </div>
        <div class="intro-right">
          <span class="name1">发布时间：</span>
          <span class="name2">2011-10-07</span>
        </div>
      </div>
      <div class="intro">
        <div class="intro-left">
          <span class="name1">挖矿方式：</span>
          <span class="name2">CPU</span> 
        </div>
        <div class="intro-right">
          <span class="name1">核心算法：</span>
          <span class="name2">scrypt算法</span>
        </div>
      </div>
      <div>
        <p class="title-1">主要特色：</p>
        <p class="main-2">人气高、国内几大交易网站支持、开发能力强</p>
        <p class="title-1">主要介绍：</p>
        <p class="main-2 main-3">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Litecoin受到了比特币(BTC)的启发，并且在技术上具有相同的实现原理，Litecoin的创造和转让基于一种开源的加密协议，不受到任何中央机构的管理。Litecoin旨在改进比特币，与其相比，Litecoin具有三种显著差异。第一，Litecoin网络每2.5分钟（而不是10分钟）就可以处理一个块，因此可以提供更快的交易确认。第二，Litecoin网络预期产出8400万个Litecoin，是比特币网络发行货币量的四倍之多。第三，Litecoin在其工作量证明算法中使用了由Colin Percival首次提出的scrypt加密算法。</p>
      </div>      
    </div>
    <div v-if="showHide==8">
      <div>
        <p class="main-1">比特现金（BCC）简介</p>
      </div>
      <div class="intro">
        <div class="intro-left">
          <span class="name1">中文名：</span>
          <span class="name2">比特现金</span>
        </div>
        <div class="intro-right">
          <span class="name1">英文名：</span>
          <span class="name2">Bitcoin Cash</span>
        </div> 
      </div>
      <div class="intro">
        <div class="intro-left">
          <span class="name1">简称：</span>
          <span class="name2">BCC</span>
        </div>
        <div class="intro-right">
          <span class="name1">货币总量：</span>
          <span class="name2"></span>
        </div>
      </div>
      <div class="intro">
        <div class="intro-left">
          <span class="name1">区块时间：</span>
          <span class="name2">10分钟</span> 
        </div>
        <div class="intro-right">
          <span class="name1" >发布时间：</span>
          <span class="name2" >2017-08-01</span>
        </div>
      </div>
      <div class="intro">
        <div class="intro-left">
          <span class="name1">挖矿方式：</span>
          <span class="name2">CPU</span> 
        </div>
        <div class="intro-right">
          <span class="name1">核心算法：</span>
           <span class="name2">SHA-256</span>
        </div>
      </div>
      <div>
        <p class="title-1">主要特色：</p>
        <p class="main-2"></p>
        <p class="title-1">主要介绍：</p>
        <p class="main-2 main-3">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Bitcoin Cash修改了比特币的代码，支持大区块（将区块大小提升至8M），不包含SegWit功能，是BitcoinABC方案产生的区块链资产。
        Bitcoin Cash的前世就是比特币，在分叉之前它存储的区块链中的数据以及运行的软件是和所有比特币节点兼容的，而到了分叉那一刻以后，它开始执行新的代码，打包大区块，形成新的链。</p>
      </div>      
    </div>
    <div v-if="showHide==9">
     <!--  <div>
        <p class="main-1">泰达币(USDT)简介 </p>
      </div>
      <div class="intro">
        <span class="name1" style="margin-left:15px;">中文名：</span>
        <span class="name2">泰达币</span>  
        <span class="name1 name1-1 name1-2">英文名：</span>
        <span class="name2 name2-1 name1-2">Tether USD</span>
      </div>
      <div class="intro">
        <span class="name1" style="margin-left:28px;">简称：</span>
        <span class="name2">USDT</span>  
        <span class="name1 name1-1 name2-2">货币总量：</span>
        <span class="name2 name2-1 name2-2"></span>
      </div>
      <div class="intro">
        <span class="name1">区块时间：</span>
        <span class="name2"></span> 
        <span class="name1 name1-1 name3-2" style="left:286px;">发布时间：</span>
        <span class="name2 name2-1 name3-2" style="left:286px;">2014年</span>
      </div>
      <div class="intro">
        <span class="name1">挖矿方式：</span>
        <span class="name2"></span>  
        <span class="name1 name1-1 name3-3" style="left:295px;">核心算法：</span>
        <span class="name2 name2-1 name3-3" style="left:295px;"></span>
      </div>
      <div>
        <p class="title-1">主要特色：</p>
        <p class="main-2">和美元1:1兑换,稳定</p>
        <p class="title-1">主要介绍：</p>
        <p class="main-2 main-3">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;泰达币（USDT）是Tether公司推出的基于稳定价值货币美元（USD）的代币Tether USD（下称USDT），1USDT=1美元，用户可以随时使用USDT与USD进行1:1兑换。Tether 公司严格遵守1：1的准备金保证，即每发行1个 USDT 代币，其银行账户都会有1美元的资金保障。用户可以在 Tether 平台进行资金查询，以保障透明度。</p>
      </div>   -->    
    </div>
    <div v-if="showHide==10">
      <div>
        <p class="main-1">比特元(bityuan)简介 </p>
      </div>
      <div class="intro">
        <div class="intro-left">
          <span class="name1">中文名：</span>
          <span class="name2">比特元</span> 
        </div>
        <div class="intro-right">
          <span class="name1">英文名：</span>
          <span class="name2">bityuan</span>
        </div>
      </div>
      <div class="intro">
        <div class="intro-left">
          <span class="name1">简称：</span>
          <span class="name2">BTY</span>
        </div>
        <div class="intro-right">
          <span class="name1">货币总量：</span>
          <span class="name2"></span>
        </div>
      </div>
      <div class="intro">
        <div class="intro-left">
          <span class="name1">区块时间：</span>
          <span class="name2">   </span> 
        </div>
        <div class="intro-right">
          <span class="name1" >发布时间：</span>
          <span class="name2">2014年1月</span>
        </div>
      </div>
      <div class="intro">
        <div class="intro-left">
          <span class="name1">挖矿方式：</span>
          <span class="name2"></span>
        </div>
        <div class="intro-right">
          <span class="name1">核心算法：</span>
         <span class="name2">POS</span>
        </div>     
      </div>
      <div>
        <p class="title-1">主要特色：</p>
        <p class="main-2">1、比特元系统简单、稳定、性能强大，确认时间短；<br>2、拥有钱包找回功能（已申请专利），多样的私钥管理方案；<br>3、资产保值功能；<br>4、比特元抵押发币；<br>5、比特元跨链币币交易；<br>6、力争成为全球资产交易的主要媒介，用户大部分费用可以减免；<br>7、POS环保挖矿；<br>8、持币者委托代理挖矿，分享收益，挖矿收益部分进入发展基金，及用于税收减免及公益活动.</p>
        <p class="title-1">主要介绍：</p>
        <p class="main-2">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;比特元发行于2014年初，初期为POW版本，2014年下半年转为POS，目前流通量约3亿，是国内稳健良好发展的数字货币之一。2017年比特元团队决定对钱包进行重大更新，结合比特币、比特股、以太坊技术进行多项创新。</p>
        <p class="title-1">目标定位:</p>
        <p class="main-2 ">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;对标比特币，是支付快，并发量大，使用方便的资产交易媒介。</p>
        <p class="title-1">竞争优势:</p>
        <p class="main-2">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;大众分享利益、技术先进迭代快、稳健长久发展。</p>
      </div>      
    </div>
    <div v-if="showHide==11">
      <div>
        <p class="main-1">原链(YCC)简介 </p>
      </div>
    </div>
    <!-- <div v-if="showHide==12">
      <div>
        <p class="main-1">比特宝（BTCS）简介</p>
      </div>
      <div class="intro">
        <div class="intro-left">
          <span class="name1">中文名：</span>
          <span class="name2">比特宝</span> 
        </div>
        <div class="intro-right">
          <span class="name1">英文名：</span>
          <span class="name2">Bitcoin Stake</span>
        </div>
      </div>
      <div class="intro">
        <div class="intro-left">
          <span class="name1">简称：</span>
          <span class="name2">BTCS</span> 
        </div>
        <div class="intro-right">
          <span class="name1">货币总量：</span>
          <span class="name2">21.21亿</span>
        </div>
      </div>
      <div class="intro">
        <div class="intro-left">
          <span class="name1">区块时间：</span>
          <span class="name2"></span> 
        </div>
        <div class="intro-right">
          <span class="name1">发布时间：</span>
          <span class="name2">2017-12-19</span>
        </div>
      </div>
      <div class="intro">
        <div class="intro-left">
          <span class="name1">挖矿方式：</span>
          <span class="name2">POS</span> 
        </div>
        <div class="intro-right">
          <span class="name1">核心算法：</span>
          <span class="name2"></span>
        </div> 
      </div>
      <div>
        <p class="title-1">主要特色：</p>
        <p class="main-2">加密与奖励机制；去中心化与备份；Sia如何应对Sybil攻击；</p>
        <p class="title-1">主要介绍：</p>
        <p class="main-2 main-3"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 采用股权证明机制（POS），相比POW模式更环保，一定程度减少了数学运算带来的资源消耗。打破了现在挖矿芯片厂商对算力的垄断，使比特币的权力中心更加去中心化，恢复比特币初期人人可以参与挖矿的情形。可拓展性，有机会加入智能合约、零知识证明等技术。</p>
      </div>      
    </div> -->
    <div v-if="showHide==12">
      <div>
        <p class="main-1">DCR简介</p>
      </div>
      <div class="intro">
        <div class="intro-left">
          <span class="name1">中文名：</span>
          <span class="name2">德信币</span> 
        </div>
        <div class="intro-right">
          <span class="name1">英文名：</span>
          <span class="name2">Decred</span>
        </div>
      </div>
      <div class="intro">
        <div class="intro-left">
          <span class="name1">简称：</span>
          <span class="name2">DCR</span> 
        </div>
        <div class="intro-right">
          <span class="name1">货币总量：</span>
          <span class="name2">2100万</span>
        </div>
      </div>
      <div class="intro">
        <div class="intro-left">
          <span class="name1">区块时间：</span>
          <span class="name2">10分钟</span> 
        </div>
        <div class="intro-right">
          <span class="name1">发布时间：</span>
          <span class="name2">2015-09</span>
        </div>
      </div>
      <div class="intro">
        <div class="intro-left">
          <span class="name1">挖矿方式：</span>
          <span class="name2">PoW和PoS混合制</span> 
        </div>
        <div class="intro-right">
          <span class="name1">核心算法：</span>
          <span class="name2">Blake-256散列算法</span>
        </div> 
      </div>
      <div>
        <p class="title-1">主要特色：</p>
        <p class="main-2">Decred的目标是使用基于区块链技术的治理模型建立一个开放和进步的加密货币；</p>
        <p class="title-1">主要介绍：</p>
        <p class="main-2 main-3"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Decred于2015年9月首次推出， Decred使用Blake-256散列算法，总量为2100万个。Decred使用一种独特的混合系统，利用工作证明和风险证明使矿工和社区其他成员之间达成共识。另外，Decred将使用secp256k1签名方案或Ed25519 / secp256k1-Schnorr更好地集成到现有软件中，这有点类似于SegWit试图用比特币实现的目标。Decred还使用了Schnorr签名，以及在非正式链接上签署交易的能力。Decred还具有一个非常有用的功能是在一定的时间内将交易“过期”的能力。散列附带自己的过期字段，如果填写了该字段，那么在达到一定的区块高度后，将阻止它们被包括在区块链中。例如，如果网络处理确认延迟，则可确保交易自动取消。这就是Decred相比比特币而言的优势所在，因为在比特币区块链上实现这些功能上不太可能很快实现。</p>
      </div>      
    </div>
        <!-- <div v-if="showHide==8">
            <div>
            <p class="main-1">原链币（YCC）简介</p>
            </div>
            <div>
                <p class="waring waringfrist">比特理财Licai.cn不为任何加密数字货币资产做背书，所有相关介绍均来自于第三方，并有可能存在错误和遗漏。</p>
                <p class="waring">
                    加密数字货币投资是高风险行为，您必须自行承担价格有可能归零的风险，请根据自己的能力谨慎投资，谢谢！
                </p>
                <p class="title-1">简介：</p>
                <p class="main-2">原链YCC:英文名“yuan chain”。</p>
                <p class="main-2">原链YCC汲取了比特币、瑞波币、比特股、以太坊、超级账本各系统的优点，融入多项创新技术，形成一种全新的区块链网络架构，一方面公链的性能可以超过万笔/秒，另一方面公链和许可链可以实现信息互联，价值互通。既具有公链的去中心化特征，又能兼顾许可链对性能和隐私的要求。</p>
                <p class="title-1">特点：</p>
                <p class="title-2">1.创新:</p>
                <p class="main-2">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;原链的创新方面主要包括，热替换智能合约、智能合约异构、跨链信息互联价值互通、持币产生免费流量额度，移动端私钥硬件管理方案、加密检索方案、数据对比及共识方法、登陆验证及隐私保护、公链许可链跨链身份认证及管理、近 10 项区块链抗攻击安全措施。
                这些创新实现了联盟链、私链的隐私保护和价值互通，同时实现与比特币、以太坊等公链的跨链交易。</p>
                <p class="title-2">2.目标:</p>
                <p class="main-2">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;帮助企业大幅提高运营效率，降低成本。
                个人或企业只要购买原链原生币 YCC，即可获得一定额度使用区块链系统的消费燃料，YCC 可直接作为区块链燃料使用，用于支付使用智能合约及各类服务的费用。可以把原链自组织社区这种模式类比为会员，加入的用户越多共享经济的效率就越高，用户越多就越容易产生信息和价值的交互关系，用户对原链币 YCC 的需求量也就越大。</p>
                <p class="title-1">相关信息：</p>
                <p class="main-2">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;发行总量：100亿YCC。其中30 亿用于早期投资；预留 YCC量共70 亿，用于企业应用、市场推广、技术开发、团队运营。</p>
                <p class="title-1">相关链接：</p>
                <p class="main-2 last">原链YCC官网：<a href="https://www.yuan.org">www.yuan.org</a></p>
            </div>      
        </div>
        <div v-if="showHide==9">
            <div>
            <p class="main-1">我的钱包（WDT）简介</p>
            </div>
            <div>
                <p class="waring waringfrist">比特理财Licai.cn不为任何加密数字货币资产做背书，所有相关介绍均来自于第三方，并有可能存在错误和遗漏。</p>
                <p class="waring">
                    加密数字货币投资是高风险行为，您必须自行承担价格有可能归零的风险，请根据自己的能力谨慎投资，谢谢！
                </p>
                <p class="title-1">简介：</p>
                <p class="main-2">WDT：WorldToken，中文名“我的钱包”。</p>
                <p class="main-2">WorldToken是一个基于区块链技术的数字资产存储设备。任何机构和个人，都可以在WorldToken上开设自己的账户，并可将WDT用于存贷、支付、兑换、结算、投资等服务。</p>
                <p class="main-2">WorldToken将致力于建立一个分布式超级金融市场，打造一个跨链的数字资产管理终端，成为数字资产管理行业的“支付宝”。</p>
                <p class="title-1">功能：</p>
                <p class="title-2">1.安全性：</p>
                <p class="main-2">软件方面，采用多重国际领先的加密技术，私钥永不联网；</p>
                <p class="main-2">硬件方面，通过蓝牙SIM卡及蓝牙U盾，做到冷热钱包分离。</p>
                <p class="title-2">2.多样性：</p>
                <p class="main-2">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;可添加BTC、 ETH、 ETC等国内外大多数主流数字资产，未来还将不断的增加其他数字资产标的。</p>
                <p class="title-2">3.功能性：</p>
                 <p class="main-2">
                    可进行数字资产的转入、储存和支付；</p>
                <p class="main-2">
                    钱包内的数字资产之间的兑换，也可以用数字资产进行TOKEN SALE、投资、消费等。</p>
                <p class="title-1">相关信息：</p>
                <p class="main-2">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;WorldToken发行总量：20亿枚WDT
                其中，3亿WDT用于早期投资；4亿WDT用于市场推广，建设WorldToken生态圈；6亿WDT用于技术团队开发；7亿WDT团队运营管理。</p>
                <p class="title-1">WDT相关链接：</p>
                <p class="main-2 last">WorldToken的官网<a href="http://www.WorldToken.cn">http://www.WorldToken.cn</a></p>
            </div>      
        </div> -->
    </div>
</template>
<script>
export default{
  data(){
    return{
      showHide:1,
      isactive:1
    }
  },
  mounted(){
   
    var type=this.$route.query.ciontype;
    if(type){
      this.fn(this. clist(type));
    }
  },
  methods:{
    clist(type){
      let list={
        'BTC' : 1,
        'ETH' : 2,
        'ETC' : 3,
        'ZEC' : 5,
        'LTC' : 7,
        'BCC' : 8,
        'USDT' : 9,
        'BTY':10,
        'YCC':11,
        'BTS':6,
        "SC":4,
        "DCR":12,
      }
      return list[type];
    },
    fn(index){
      this.showHide=index;
      this.isactive=index;
    }
  }
}
</script>
<style>
.notice-box {
  background-color: #fff;
  min-height: 500px;
  margin: 0 auto 20px;
  width: 887px;
  h5{
    height: 60px;
    line-height: 60px;
    font-size: 18px;
    color: #333;
  }
  .label{
    width: 126px;
    height: 35px;
    line-height: 35px;
    font-size: 14px;
    color: #333;
    text-align: center;
    float: left;
    background: #ebebeb;
    border-right: 1px solid #fff;
    margin-top: 5px;
  }
  .active,.label:hover{
    color: #e61f19;
    cursor:default
  }
  .main-1{
    font-size: 16px;
    color: #333;
    font-weight: bold;
    position:relative;
    border-bottom: 1px solid #e6e6e6;
    margin-top: 95px;
    padding-bottom: 25px;
  }
  .intro{
    height: 63px;
    line-height: 63px;
    border-bottom: 1px solid #e6e6e6;
    .intro-left{
       width: 50%;
       display: inline-block;
       float: left;
    }
    .intro-right{
      width: 50%;
      float: right;
      display: inline-block;
    }
  }
  .name1{
    display: inline-block;
    text-align: right;
    font-size: 14px;
    color: #666;
    position: relative;
    right: 0px;
    width: 70px;
  }
  .name2{
    font-size: 14px;
    color: #333;
    margin-left: 13px;
  }
  .name1-1{
    position: relative;
    left: 300px;
  }
  .name2-1{
    position: relative;
    left: 300px;
  }
  .name1-2{
    left: 297px;
  }
  .name2-2{
    left: 300px;
  }
  .name3-2{
    left: 283px;
  }
  .waring{
    color: red;
    font-size: 16px;
    line-height: 24px;
  }
  .waringfrist{
    margin-top: 20px;
  }
  .title-1{
    font-size: 16px;
    color: #333;
    font-weight: bold;
    padding-top: 20px;
    padding-bottom: 20px;
  }
  .title-2{
    font-size: 14px;
    font-weight: bold;
    color: #333;
    margin: 10px 0;
  }
  .last{
    margin-bottom: 40px;
  }
  .main-2{
    font-size: 14px;   
    color: #333;
  }
  .main-3{
    padding-bottom: 77px;
    line-height: 30px;
  }
}
</style>