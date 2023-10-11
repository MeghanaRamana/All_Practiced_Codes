trigger duplicateContactTrigger on Contact (before insert) {
 duplicateConHandler.checkDuplicates(trigger.new);
}