trigger trigger2 on Account (before insert) {
    for(account acc: trigger.new){
       system.debug('------'+trigger.new);
    }

}