using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly DataContext dataContext;
        public EmployeesController(DataContext dataContext)
        {
            this.dataContext = dataContext;
        }

        [HttpGet("test")]

        public async Task<string> test()
        {
            return "string";
        }
            
        [HttpPost("add")]
        public async Task<Employee> CreateEmployee(Employee Employee)
        {
            this.dataContext.Employees.Add(Employee);
            await this.dataContext.SaveChangesAsync();
            return Employee;
        }
        [Authorize(Roles = "Admin")]
        [HttpDelete("deleteEmployee/{id}")]
        public async Task<Employee> DeleteEmployee(int id)
        {

            var  Employee  = await this.dataContext.Employees.FindAsync(id);
            this.dataContext.Employees.Remove(Employee);
            this.dataContext.SaveChanges();
            
            return Employee;

        }
        [Authorize(Roles = "Admin")]
        [HttpPut("UpdateEmployee/{id}")]
        public async Task<IActionResult> UpdateEmployee(int id,[FromBody]Employee employee)
        {
            var Employee = await this.dataContext.Employees.FindAsync(id);
            this.dataContext.Employees.Update(employee);
            this.dataContext.SaveChanges();

            return Ok("data updated successfully");
        }

        [HttpGet("getAllEmployees")]
        public async Task<List<Employee>> getAllEmployees()
        {
            var Employees = this.dataContext.Employees.ToList();
          
            return Employees;
        }

    }
}
