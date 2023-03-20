package com.codegym.repository;

import com.codegym.model.user.Role;
import com.codegym.model.user.RoleName;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface IRoleRepository extends JpaRepository<Role,Integer> {

    Optional<Role> findByName(RoleName name);
    /**
     * Created by: CuongVV
     * Date created: 28/2/2023
     * Function: get ROLE ADMIN
     * @param:none
     **/
    @Query(value = "select r.* from role r where r.name = 'ROLE_ADMIN'",nativeQuery = true)
    Optional<Role>  roleAdmin();
        /**
     * Created by: CuongVV
     * Date created: 28/2/2023
     * Function: get ROLE CUSTOMER
     * @param:none
     **/
    @Query(value = "select r.* from role r where r.name = 'ROLE_CUSTOMER'",nativeQuery = true)
    Optional<Role> roleCustomer();
    /**
     * Created by: CuongVV
     * Date created: 28/2/2023
     * Function: get ROLE EMPLOYEE
     * @param:none
     **/
    @Query(value = "select r.* from role r where r.name = 'ROLE_EMPLOYEE'",nativeQuery = true)
    Optional<Role> roleEmployee();
}
