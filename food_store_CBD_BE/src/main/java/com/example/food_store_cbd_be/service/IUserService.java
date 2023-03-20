package com.codegym.service;

import com.codegym.dto.billHistory.BillHistoryDTO;
import com.codegym.dto.request.UpdateUserForm;
import com.codegym.model.user.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;
import java.util.Optional;

public interface IUserService {

    /**
     * Created by: CuongVV
     * Date created: 28/2/2023
     * Function: find User by username
     * @param:username
     **/
    Optional<User> findByUsername(String username);

    /**
     * Created by: CuongVV
     * Date created: 28/2/2023
     * Function: update user
     * @param:updateUserForm
     **/
    void updateUser(UpdateUserForm updateUserForm);
    /**
     * Created by: CuongVV
     * Date created: 28/2/2023
     * Function: changer password
     * @param:password,username
     **/
    void changePassword(String password,String username);
    /**
     * Created by: CuongVV
     * Date created: 28/2/2023
     * Function: insert into table user to register account
     * @param:user
     **/
    void save(User user);
    /**
     * Created by: CuongVV
     * Date created: 28/2/2023
     * Function: check exists user by username
     * @param:username
     **/
    Boolean existsByUsername(String username);
    /**
     * Created by: CuongVV
     * Date created: 28/2/2023
     * Function: check exists user by email
     * @param:email
     **/
    Boolean existsByEmail(String email);

    /**
     * Created by: CuongVV
     * Date created: 28/2/2023
     * Function: get all user
     * @param:none
     **/
    List<User> findAll();
    /**
     * Created by: CuongVV
     * Date created: 28/2/2023
     * Function: get all CUSTOMER
     * @param:none
     **/
    List<User> findAllCustomer();
    /**
     * Created by: CuongVV
     * Date created: 28/2/2023
     * Function: get all EMPLOYEE
     * @param:none
     **/
    List<User> findAllEmployee();
    /**
     * Created by: CuongVV
     * Date created: 28/2/2023
     * Function: get all ADMIN
     * @param:none
     **/
    List<User> findAllAdmin();

    /**
     * Created by: LongPT
     * Date created: 27/2/2023
     * Function: get all customer
<<<<<<< HEAD
<<<<<<< HEAD

     * Created by: LongPT
     * Date created: 27/2/2023
     * Function: get all customer
=======
>>>>>>> origin/develop
=======
     *
>>>>>>> origin/develop
     * @param name
     * @param address
     * @param pageable
     */
    Page<User> findAllCustomer(Pageable pageable, String name, String address);

    /**
     * Created by: LongPT
     * Date created: 27/2/2023
     * Function: get customer by id
     *
     * @param id
     */
    Optional<User> findCustomerById(Integer id);

    /**
     * Created by: LongPT
     * Date created: 27/2/2023
     * Function: get customer by id
     *
     * @param pageable
     */
     
    Page<User> findAllCustomerNoParam(Pageable pageable);


    /**
     * Created by: HuyNL
     * Date created: 27/2/2023
     * Function: get customer by id
     *
     * @param ageSearch
     * @param genderSearch
     * @param pageable
     */
    Page<User> findAll(String genderSearch, String ageSearch, Pageable pageable);

    List<BillHistoryDTO> getUserHasBuy();

    User userLogin(String username);
}
