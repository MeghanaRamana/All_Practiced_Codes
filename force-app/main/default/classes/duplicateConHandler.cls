public class duplicateConHandler {
 public static void checkDuplicates(List<Contact> newContacts) {
    Map<Id, Contact> contactByAccount = new Map<Id, Contact>();
    for (Contact c : newContacts) {
      Contact existing = contactByAccount.get(c.AccountId);
      if (existing != null) {
        if (existing.FirstName == c.FirstName && existing.LastName == c.LastName) {
          c.FirstName.addError('A contact with the same name already exists for this account');
        }
      } else {
        contactByAccount.put(c.AccountId, c);
      }
    }
  }
}